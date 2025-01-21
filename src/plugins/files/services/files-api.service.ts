import { createReadStream, type ReadStream } from 'fs';
import { injectable } from 'tsyringe';
import { NotFoundError } from '../../../common/classes/errors';
import type { Files } from '../../../db';
import FilesRepository from '../repositories/files.repository';

@injectable()
export default class FilesStaticService {
  constructor(
    private readonly _filesRepository: FilesRepository,
  ) {
  }

  async getFileStreamById(id: string): Promise<{ file: Files; stream: ReadStream; }> {
    const file = await this._filesRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundError('File not found');
    }

    const stream = createReadStream(file.path);

    return { file, stream };
  }
}
