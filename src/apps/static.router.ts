import { Router } from 'express';
import { injectable } from 'tsyringe';
import StaticFilesController from '../plugins/files/api/files.static';

@injectable()
export default class StaticRouter {
  protected router: Router;

  constructor(
    private readonly _staticFilesController: StaticFilesController,
  ) {
    this.router = Router();
  }

  register() {
    this.router.use('/files', this._staticFilesController.register());

    return this.router;
  }
}
