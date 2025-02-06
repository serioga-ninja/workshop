import { singleton } from 'tsyringe';
import LoggerService from '../logger.service';
import type UploadProviderBase from './upload-provider-base';
import config from '../../../config';
import { FileUploadProvider } from '../../constants';
import UploadProviderLocal from './upload-provider-local';
import UploadProviderS3 from './upload-provider-s3';
import AWSService from '../../../libs/aws';

@singleton()
export default class FilesService {
  private readonly _uploadProvider: UploadProviderBase;

  constructor(
    logger: LoggerService,
    awsService: AWSService,
  ) {
    switch (config.FILE_UPLOAD_PROVIDER) {
      case FileUploadProvider.Local:
        this._uploadProvider = new UploadProviderLocal(logger);
        break;
      case FileUploadProvider.S3:
        this._uploadProvider = new UploadProviderS3(
          logger,
          awsService,
        );
        break;
    }
  }

  init() {
    return this._uploadProvider.init();
  }

  uploadFile(...args: Parameters<UploadProviderBase['uploadFile']>) {
    return this._uploadProvider.uploadFile(...args);
  }

  getFile(...args: Parameters<UploadProviderBase['getFile']>) {
    return this._uploadProvider.getFile(...args);
  }
}
