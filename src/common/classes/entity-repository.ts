import { randomUUID } from 'node:crypto';
import { EntityStatus } from '../constants';
import type EntityBase from './entity-base';
import RepositoryBase from './repository';

export default abstract class RepositoryEntity<Entity extends EntityBase> extends RepositoryBase<Entity> {
  override createOne(data: Partial<Entity>): Promise<Entity> {
    return super.createOne({
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      entityStatus: EntityStatus.Draft,
      ...data,
    });
  }

  override updateOneBy(where: Partial<Entity>, data: Partial<Entity>): Promise<Entity> {
    return super.updateOneBy(
      where,
      {
        updatedAt: new Date(),
        ...data,
      },
    );
  }

  async softDeleteOneBy(where: Partial<Entity>) {
    const data = {
      entityStatus: EntityStatus.Deleted,
    } as Partial<Entity>;

    return await this.updateOneBy(
      where,
      data,
    );
  }
}
