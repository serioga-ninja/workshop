import { singleton } from 'tsyringe';
import { S3Client } from '@aws-sdk/client-s3';
import LoggerService from '../../common/services/logger.service';
import config from '../../config';
import { ApiError } from '../../common/classes/errors';

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_S3_BUCKET, AWS_SECRET_ACCESS_KEY } = config;

@singleton()
export default class AWSService {
  private readonly _logger: LoggerService;
  private _s3Client: S3Client;

  private _isInitialized = false;

  constructor(
    logger: LoggerService,
  ) {
    this._logger = logger.createChild('AWSService');
  }

  init() {
    if (this._isInitialized) {
      return;
    }

    this._logger.info('Initializing AWS service');

    if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_S3_BUCKET || !AWS_SECRET_ACCESS_KEY) {
      this._logger.error('AWS credentials are missing');
    }

    this._s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    this._isInitialized = true;
    this._logger.info('AWS service initialized');
  }

  getClient() {
    if (!this._s3Client) {
      throw new ApiError('AWS service is not initialized');
    }

    return this._s3Client;
  }
}
