import type { CreateOneRequest } from '../../../common/types/api.types';

export type CreateOneArticleRequestBody = {
  title: string;
  content: string;
  createdById: string;
};
export type CreateOneArticleRequest = CreateOneRequest<CreateOneArticleRequestBody>;
