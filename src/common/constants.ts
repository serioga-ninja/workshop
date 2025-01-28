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
  ValidationError = 'VALIDATION_ERROR',
  NotFound = 'NOT_FOUND',
}

export enum FileUploadProvider {
  Local = 'local',
  S3 = 's3',
}
