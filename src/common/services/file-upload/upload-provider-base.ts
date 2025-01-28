import type LoggerService from '../logger.service';

export type UploadFileOptions = {
  format: string;
  fileName?: string;
};

export type UploadFileResult = {
  filePath: string;
  fileName: string;
  fullName: string;
};

export default abstract class UploadProviderBase {
  protected logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger.createChild(this.constructor.name);
  }

  abstract init(): Promise<void>;
  abstract uploadFile(file: Buffer, options: UploadFileOptions): Promise<UploadFileResult>;
}
