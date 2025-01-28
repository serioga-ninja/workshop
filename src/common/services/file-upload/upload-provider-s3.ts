import UploadProviderBase, { type UploadFileOptions, type UploadFileResult } from './upload-provider-base';

export default class UploadProviderS3 extends UploadProviderBase {
  override init(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  override uploadFile(file: Buffer, options: UploadFileOptions): Promise<UploadFileResult> {
    throw new Error('Method not implemented.');
  }
}
