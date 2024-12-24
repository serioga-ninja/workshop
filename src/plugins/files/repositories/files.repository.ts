import type { EntityTarget } from 'typeorm';
import { injectable } from 'tsyringe';
import RepositoryEntity from '../../../common/classes/entity-repository';
import { Files } from '../../../db';

@injectable()
export default class FilesRepository extends RepositoryEntity<Files> {
  override model: EntityTarget<Files> = Files;
  override alias = 'files';
}
