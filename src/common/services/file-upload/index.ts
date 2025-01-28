import { singleton } from 'tsyringe';
import LoggerService from '../logger.service';
import type UploadProviderBase from './upload-provider-base';
import config from '../../../config';
import { FileUploadProvider } from '../../constants';
import UploadProviderLocal from './upload-provider-local';
import UploadProviderS3 from './upload-provider-s3';

@singleton()
export default class FileUploadService {
  private readonly _uploadProvider: UploadProviderBase;

  constructor(logger: LoggerService) {
    switch (config.FILE_UPLOAD_PROVIDER) {
      case FileUploadProvider.Local:
        this._uploadProvider = new UploadProviderLocal(logger);
        break;
      case FileUploadProvider.S3:
        this._uploadProvider = new UploadProviderS3(logger);
        break;
    }
  }

  init() {
    return this._uploadProvider.init();
  }

  uploadFile(...args: Parameters<UploadProviderBase['uploadFile']>) {
    return this._uploadProvider.uploadFile(...args);
  }
}
