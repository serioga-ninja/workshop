import type { EntityStatus } from '../../../common/constants';
import type { GetListPagedQuery } from '../../../common/types';

export type GetArticlesPagedQuery = GetListPagedQuery & {
  createdById?: string;
  entityStatus?: EntityStatus;
};
