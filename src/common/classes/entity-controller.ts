import type { GetOneApiRequest } from '../types/api.types';
import type { SuccessResponse } from './api-controller';
import ApiController from './api-controller';
import type EntityBase from './entity-base';
import type EntityService from './entity-service';

export default abstract class EntityController<Entity extends EntityBase> extends ApiController {

  constructor(protected service: EntityService<Entity>) {
    super();
  }

  protected async getOne(request: GetOneApiRequest): Promise<SuccessResponse<Entity>> {
    const entity = await this.service.findOneBy({
      id: request.params.id
    } as Partial<Entity>);

    return this.toSuccessResponse(
      entity,
      'Entity found'
    );
  }
}
