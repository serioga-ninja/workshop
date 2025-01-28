import { Column, Entity } from 'typeorm';
import EntityBase from '../../common/classes/entity-base';

export type ImageMetaData = {
  width: number;
  height: number;
};

type MetaData = ImageMetaData | {
  [key: string]: any;
};

@Entity('files')
export default class Files extends EntityBase {
  @Column('varchar', { length: 255 })
    name: string;

  @Column('varchar', { length: 255 })
    path: string;

  @Column('varchar', { length: 20 })
    type: string;

  @Column('uuid', { name: 'parent_id' })
    parentId: string | null;

  @Column('integer')
    size: number;

  @Column('jsonb', { name: 'meta' })
    meta: MetaData;
}
