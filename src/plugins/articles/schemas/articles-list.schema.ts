import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ListSchema } from '../../../common/schemas';
import type { GetArticlesPagedQuery } from '../types/articles.repository';
import { EntityStatus } from '../../../common/constants';

export default class ArticlesListSchema extends ListSchema implements GetArticlesPagedQuery {
  @IsString()
  @IsOptional()
    createdById?: string | undefined;

  @IsOptional()
  @IsEnum(EntityStatus)
    entityStatus?: EntityStatus | undefined;

  constructor(data: GetArticlesPagedQuery) {
    super(data);
    this.createdById = data.createdById;
    this.entityStatus = data.entityStatus;
  }
}
