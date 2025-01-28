import type { EmptyObject } from '../../../common/types';
import type { ApiRequest } from '../../../common/types/api.types';

export type GetFileRequest = ApiRequest<{ id: string; }, EmptyObject, { w?: string; }>;
