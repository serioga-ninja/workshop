import RepositoryEntity from 'src/common/classes/entity-repository';
import { Articles } from 'src/db';
import { injectable } from 'tsyringe';
import { EntityStatus } from '../../../common/constants';
import type { GetListPagedReturn } from '../../../common/types';
import type { GetArticlesPagedQuery } from '../types/articles.repository';

@injectable()
export default class ArticlesRepository extends RepositoryEntity<Articles> {
  model = Articles;
  alias = 'articles';

  override async getListPaged(query: GetArticlesPagedQuery): Promise<GetListPagedReturn<Articles>> {
    const {
      page = 1,
      pageSize = 1000,
      sortBy = 'updatedAt',
      sortDir = 'DESC',
      createdById,
      entityStatus = EntityStatus.Active,
    } = query;

    const qb = this.getListPagedQueryBuilder({
      page,
      pageSize,
      sortBy,
      sortDir,
    });

    qb.where(`${this.alias}.entityStatus = :entityStatus`, { entityStatus });

    if (createdById) {
      qb.andWhere(`${this.alias}.createdById = :createdById`, { createdById });
    }

    const [result, count] = await qb.getManyAndCount();

    return this.toListPagedResponse(result, count, page, pageSize);
  }
}
