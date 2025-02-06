import { injectable } from 'tsyringe';
import type { Readable } from 'stream';
import { NotFoundError } from '../../../common/classes/errors';
import type { Files } from '../../../db';
import FilesRepository from '../repositories/files.repository';
import FilesService from '../../../common/services/files-service';

type GetFileStreamByIdParams = {
  imageId: string;
  w?: string;
};

@injectable()
export default class FilesStaticService {
  constructor(
    private readonly _filesRepository: FilesRepository,
    private readonly _filesService: FilesService,
  ) {
  }

  async getFileStreamById(params: GetFileStreamByIdParams): Promise<{ file: Files; stream: Readable; }> {
    const { imageId, w } = params;
    const width = w ? parseInt(w) : null;
    const file = await this._filesRepository.findImageBySize(
      imageId,
      width,
    );

    if (!file) {
      throw new NotFoundError('File not found');
    }

    const stream = await this._filesService.getFile(file.path);

    return { file, stream };
  }
}
