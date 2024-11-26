import EntityService from 'src/common/classes/entity-service';
import type { Articles } from 'src/db';
import { injectable } from 'tsyringe';
import ArticlesRepository from '../repositories/articles.repository';

@injectable()
export default class ArticlesService extends EntityService<Articles> {
  constructor(repository: ArticlesRepository) {
    super(repository);
  }

  doSome() {
    return 'some';
  }
}
