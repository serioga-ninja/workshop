import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import type { GetListPagedQuery } from '../types';

export default class ListSchema implements GetListPagedQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
    page?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
    pageSize?: number;

  @IsOptional()
  @IsString()
    sortBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
    sortDir?: 'ASC' | 'DESC';

  constructor(data: GetListPagedQuery) {
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.sortBy = data.sortBy;
    this.sortDir = data.sortDir;
  }
}
