import type { EntityTarget } from 'typeorm';
import { injectable } from 'tsyringe';
import RepositoryEntity from '../../../common/classes/entity-repository';
import { Files } from '../../../db';

@injectable()
export default class FilesRepository extends RepositoryEntity<Files> {
  override model: EntityTarget<Files> = Files;
  override alias = 'files';

  findImageBySize(fileId: string, width?: number | null): Promise<Files | null> {
    const qb = this.getQueryBuilder()
      .where(`${this.alias}.parent_id = :fileId`, { fileId })
      .orWhere(`${this.alias}.id = :fileId`, { fileId });

    if (width) {
      qb.orderBy(`ABS((${this.alias}.meta->>'width')::NUMERIC - ${width})`, 'ASC');
    }

    return qb.getOne();
  }
}
