import EntityService from 'src/common/classes/entity-service';
import type { Articles } from 'src/db';
import type ArticlesRepository from '../repositories/articles.repository';

export default class ArticlesCRUDService extends EntityService<Articles> {
  constructor(
    _articlesRepository: ArticlesRepository
  ) {
    super(_articlesRepository);
  }
}
