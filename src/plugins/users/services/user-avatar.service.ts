import type { UploadedFile } from 'express-fileupload';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { injectable } from 'tsyringe';
import { EntityStatus } from '../../../common/constants';
import ImageResizeService from '../../../common/services/image-resize.service';
import FilesRepository from '../../files/repositories/files.repository';
import UsersRepository from '../repositories/users.repository';

@injectable()
export default class UserAvatarService {
  constructor(
    private readonly _filesRepository: FilesRepository,
    private readonly _imageResizeService: ImageResizeService,
    private readonly _usersRepository: UsersRepository,
  ) {}

  async uploadUserAvatar(authUserId: string, file: UploadedFile) {
    const fileFolder = join(process.cwd(), '.uploads');
    const [originalImage] = await this._imageResizeService.processImage(
      file.data,
      { config: [{ width: 500, height: 500 }] },
    );
    const imageData = await this._imageResizeService.processImage(file.data, {
      config: [
        { width: 200, height: 200 },
        { width: 100, height: 100 },
      ],
    });

    if (!existsSync(fileFolder)) {
      mkdirSync(fileFolder, { recursive: true });
    }

    const originalFileName = `${file.md5}.${originalImage.info.format}`;
    const originalImagePath = join(fileFolder, originalFileName);
    await writeFile(originalImagePath, new Uint8Array(originalImage.data));
    const originalFileEntity = await this._filesRepository.createOne({
      name: file.name,
      path: originalImagePath,
      entityStatus: EntityStatus.Active,
      type: `image/${originalImage.info.format}`,
      size: originalImage.info.size,
    });

    await Promise.all(imageData.map(async (image) => {
      const fileName = `${file.md5}-${image.info.width}x${image.info.height}.${image.info.format}`;
      const filePath = join(fileFolder, fileName);
      await writeFile(filePath, new Uint8Array(image.data));

      await this._filesRepository.createOne({
        name: fileName,
        path: filePath,
        type: `image/${image.info.format}`,
        entityStatus: EntityStatus.Active,
        parentId: originalFileEntity.id,
        size: image.data.byteLength,
      });
    }));

    await this._usersRepository.updateOneBy({ id: authUserId }, { avatarId: originalFileEntity.id });
  }
}
