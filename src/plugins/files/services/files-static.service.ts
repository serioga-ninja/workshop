import { createReadStream, type ReadStream } from 'fs';
import { injectable } from 'tsyringe';
import { NotFoundError } from '../../../common/classes/errors';
import type { Files } from '../../../db';
import FilesRepository from '../repositories/files.repository';

type GetFileStreamByIdParams = {
  imageId: string;
  w?: string;
};

@injectable()
export default class FilesStaticService {
  constructor(
    private readonly _filesRepository: FilesRepository,
  ) {
  }

  async getFileStreamById(params: GetFileStreamByIdParams): Promise<{ file: Files; stream: ReadStream; }> {
    const { imageId, w } = params;
    const width = w ? parseInt(w) : null;
    const file = await this._filesRepository.findImageBySize(
      imageId,
      width,
    );

    if (!file) {
      throw new NotFoundError('File not found');
    }

    const stream = createReadStream(file.path);

    return { file, stream };
  }
}
