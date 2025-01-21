import { injectable } from 'tsyringe';
import EntityService from '../../../common/classes/entity-service';
import type { Files } from '../../../db';
import FilesRepository from '../repositories/files.repository';

@injectable()
export default class FilesEntityService extends EntityService<Files> {
  constructor(
    repo: FilesRepository,
  ) {
    super(repo);
  }
}
