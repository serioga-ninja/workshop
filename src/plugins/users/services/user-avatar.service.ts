import type { UploadedFile } from 'express-fileupload';
import { injectable } from 'tsyringe';
import { EntityStatus } from '../../../common/constants';
import FilesService from '../../../common/services/files-service';
import ImageResizeService from '../../../common/services/image-resize.service';
import FilesRepository from '../../files/repositories/files.repository';
import UsersRepository from '../repositories/users.repository';

@injectable()
export default class UserAvatarService {
  constructor(
    private readonly _imageResizeService: ImageResizeService,
    private readonly _filesRepository: FilesRepository,
    private readonly _usersRepository: UsersRepository,
    private readonly _fileUpload: FilesService,
  ) {}

  async uploadUserAvatar(authUserId: string, file: UploadedFile) {
    const originalImage = await this._imageResizeService.resizeImage(file.data, { width: 500, height: 500 });
    const { filePath: originalImagePath } = await this._fileUpload.uploadFile(originalImage.data, { format: originalImage.info.format });

    const originalEntity = await this._filesRepository.createOne({
      name: file.name,
      path: originalImagePath,
      entityStatus: EntityStatus.Active,
      type: `image/${originalImage.info.format}`,
      size: originalImage.info.size,
      meta: originalImage.config,
    });
    await this._usersRepository.updateOneBy({ id: authUserId }, { avatarId: originalEntity.id });

    const smallImage = await this._imageResizeService.processImage(file.data, {
      config: [
        { width: 200, height: 200 },
        { width: 100, height: 100 },
      ],
    });

    await Promise.all(smallImage.map(async (image) => {
      const { fileName, filePath } = await this._fileUpload.uploadFile(image.data, { format: originalImage.info.format });

      await this._filesRepository.createOne({
        name: fileName,
        path: filePath,
        entityStatus: EntityStatus.Active,
        type: `image/${image.info.format}`,
        size: image.info.size,
        parentId: originalEntity.id,
        meta: image.config,
      });
    }));
  }
}
