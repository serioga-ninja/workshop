export enum EntityStatus {
  Active = 'active',
  Draft = 'draft',
  Deleted = 'deleted',
}

export enum Environment {
  Local = 'local',
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum ErrorStatusCode {
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  ApiError = 'API_ERROR',
  NotFound = 'NOT_FOUND',
}
