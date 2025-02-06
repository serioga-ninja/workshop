import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import type { Readable } from 'stream';
import config from '../../../config';
import type AWSService from '../../../libs/aws';
import { generateRandomString } from '../../helpers/string';
import type LoggerService from '../logger.service';
import UploadProviderBase, { type UploadFileOptions, type UploadFileResult } from './upload-provider-base';
import { ApiError } from '../../classes/errors';

const { AWS_S3_BUCKET } = config;

export default class UploadProviderS3 extends UploadProviderBase {
  private readonly _basePath = 'uploads';

  constructor(
    logger: LoggerService,
    private readonly _awsService: AWSService,
  ) {
    super(logger);
  }

  override async init(): Promise<void> {
    this._awsService.init();
  }

  override async uploadFile(file: Buffer, options: UploadFileOptions): Promise<UploadFileResult> {
    const fileName = options.fileName || generateRandomString(30);
    const fullName = `${fileName}.${options.format}`;
    const key = `${this._basePath}/${fullName}`;

    this.logger.info(`Uploading file ${options.fileName} to S3 key ${key}`);

    // Set up the parameters
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: file,
    };

    // Create and send the command to upload the file
    const command = new PutObjectCommand(params);
    await this._awsService.getClient().send(command);

    return {
      filePath: key,
      fileName,
      fullName,
    };
  }

  override async getFile(key: string) {
    // Set up the parameters
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: key,
    };
    // Create and send the command to upload the file
    const command = new GetObjectCommand(params);
    const res = await this._awsService.getClient().send(command);

    if (!res.Body) {
      throw new ApiError('File not found');
    }

    return res.Body as Readable;
  }
}
