import type { Router, Response } from 'express';

import { singleton } from 'tsyringe';
import ApiController from '../../../common/classes/api-controller';
import LoggerService from '../../../common/services/logger.service';
import FilesStaticService from '../services/files-static.service';
import type { GetFileRequest } from '../types';

@singleton()
export default class StaticFilesController extends ApiController {
  constructor(
    logger: LoggerService,
    private readonly _filesApiService: FilesStaticService,
  ) {
    super(logger);
  }

  override register(): Router {
    this.router.get('/:id', this.getFile.bind(this));

    return super.register();
  }

  protected async getFile(req: GetFileRequest, res: Response) {
    const { file, stream } = await this._filesApiService.getFileStreamById({
      imageId: req.params.id,
      w: req.query.w,
    });

    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Length', file.size.toString());

    stream.pipe(res);
  }
}
