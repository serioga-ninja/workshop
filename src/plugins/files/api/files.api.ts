import type { Router } from 'express';

import { singleton } from 'tsyringe';
import EntityController from '../../../common/classes/entity-controller';
import LoggerService from '../../../common/services/logger.service';
import type { Files } from '../../../db';
import FilesEntityService from '../services/files-entity.service';

@singleton()
export default class FilesApiController extends EntityController<Files> {
  declare protected service: FilesEntityService;

  constructor(
    logger: LoggerService,
    service: FilesEntityService,
  ) {
    super(service, logger);
  }

  override register(): Router {
    this.get('/:id', this.getOne.bind(this));

    return super.register();
  }
}
