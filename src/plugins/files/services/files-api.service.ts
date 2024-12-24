import { injectable } from 'tsyringe';
import { createReadStream, type ReadStream } from 'node:fs';
import FilesRepository from '../repositories/files.repository';
import type { Files } from '../../../db';

@injectable()
export default class FileApiService {
  constructor(
    private readonly _fileRepository: FilesRepository,
  ) {

  }

  async getFileStreamById(id: string): Promise<{ file: Files; stream: ReadStream; }> {
    const file = await this._fileRepository.findOneByOrFail({ id });

    return { file, stream: createReadStream(file.path) };
  }
}
