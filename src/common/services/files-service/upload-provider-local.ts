import { join } from 'path';
import { access, constants, mkdir, writeFile } from 'fs/promises';
import { createReadStream } from 'fs';
import UploadProviderBase, { type GetFileResult, type UploadFileOptions, type UploadFileResult } from './upload-provider-base';
import type LoggerService from '../logger.service';
import { generateRandomString } from '../../helpers/string';

export default class UploadProviderLocal extends UploadProviderBase {
  private readonly _fileFolder: string;

  constructor(logger: LoggerService) {
    super(logger);

    this._fileFolder = join(process.cwd(), '.uploads');
  }

  override async init(): Promise<void> {
    this.logger.info('Initializing local upload provider');

    try {
      await access(this._fileFolder, constants.R_OK | constants.W_OK);

      this.logger.info('File upload directory exists.');
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.logger.info('File upload directory does not exist. Creating...');
        await mkdir(this._fileFolder, { recursive: true });
      } else {
        this.logger.logError(error);
      }
    }
  }

  async uploadFile(file: Buffer, options: UploadFileOptions): Promise<UploadFileResult> {
    const fileName = options.fileName || generateRandomString(30);
    const fullName = `${fileName}.${options.format}`;
    const filePath = join(this._fileFolder, fullName);

    await writeFile(filePath, new Uint8Array(file));

    return {
      filePath,
      fileName,
      fullName,
    };
  }

  override async getFile(location: string): Promise<GetFileResult> {
    return createReadStream(location);
  }
}
