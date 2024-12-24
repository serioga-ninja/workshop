import type { Response } from 'express';
import { singleton } from 'tsyringe';
import ApiController from '../../../common/classes/api-controller';
import LoggerService from '../../../common/services/logger.service';
import FileApiService from '../services/files-api.service';
import type { GetFileRequest } from '../types';

@singleton()
export default class FilesApiController extends ApiController {
  constructor(
    logger: LoggerService,
    private readonly _fileUploadService: FileApiService,
  ) {
    super(logger);
  }

  override register() {
    this.router.get('/:id', this.getFileStatic.bind(this));

    return super.register();
  }

  protected async getFileStatic(req: GetFileRequest, res: Response) {
    const { file, stream } = await this._fileUploadService.getFileStreamById(req.params.id);

    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Length', file.size.toString());

    stream.pipe(res);
  }
}
