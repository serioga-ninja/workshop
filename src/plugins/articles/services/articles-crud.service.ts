import EntityService from 'src/common/classes/entity-service';
import { Articles } from 'src/db';
import ArticlesRepository from '../repositories/articles.repository';

export default class ArticlesCRUDService extends EntityService<Articles> {
  constructor(
    _articlesRepository: ArticlesRepository
  ) {
    super(_articlesRepository);
  }
}
