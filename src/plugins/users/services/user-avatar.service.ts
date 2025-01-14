import type { UploadedFile } from 'express-fileupload';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { injectable } from 'tsyringe';
import ImageResizeService from '../../../common/services/image-resize.service';

@injectable()
export default class UserAvatarService {
  constructor(
    private readonly _imageResizeService: ImageResizeService,
  ) {}

  async uploadUserAvatar(authUserId: string, file: UploadedFile) {
    const fileFolder = join(process.cwd(), '.uploads');

    console.log(authUserId);

    if (!existsSync(fileFolder)) {
      await mkdir(fileFolder, { recursive: true });
    }

    const originalImage = await this._imageResizeService.resizeImage(file.data, { width: 500, height: 500 });
    const originalFileName = `${file.md5}.${originalImage.info.format}`;
    const originalImagePath = join(fileFolder, originalFileName);
    await writeFile(originalImagePath, new Uint8Array(originalImage.data));

    // const smallImage = await this._imageResizeService.processImage(file.data, {
    //   config: [
    //     { width: 200, height: 200 },
    //     { width: 100, height: 100 },
    //   ],
    // });
  }
}
