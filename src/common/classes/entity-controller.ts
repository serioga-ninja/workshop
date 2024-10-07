import { GetOneApiRequest } from '../types/api.types';
import ApiController, { SuccessResponse } from './api-controller';
import EntityBase from './entity-base';
import EntityService from './entity-service';

export default abstract class EntityController<Entity extends EntityBase> extends ApiController {

  constructor(
    protected service: EntityService<Entity>
  ) {
    super();
  }

  protected async getOne(request: GetOneApiRequest): Promise<SuccessResponse<Entity>> {
    const entity = await this.service.findOneBy({
      id: request.params.id
    } as Partial<Entity>);

    return this.toSuccessResponse(entity, 'Entity found');
  }
}
