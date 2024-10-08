import type { TAny } from '../types';
import type { CreateOneRequest, GetOneRequest, UpdateOneRequest } from '../types/api.types';
import type { SuccessResponse } from './api-controller';
import ApiController from './api-controller';
import type EntityBase from './entity-base';
import type EntityService from './entity-service';

export default abstract class EntityController<Entity extends EntityBase> extends ApiController {

  constructor(protected service: EntityService<Entity>) {
    super();
  }

  protected async getOne(request: GetOneRequest): Promise<SuccessResponse<Entity>> {
    const entity = await this.service.findOneBy({
      id: request.params.id
    } as Partial<Entity>);

    return this.toSuccessResponse(
      entity,
      'Entity found'
    );
  }

  protected async createOne(request: CreateOneRequest<TAny>): Promise<SuccessResponse<Entity>> {
    const entity = await this.service.createOne(request.body);

    return this.toSuccessResponse(
      entity,
      'Entity created'
    );
  }

  protected async updateOne(request: UpdateOneRequest<TAny>): Promise<SuccessResponse<Entity>> {
    const entity = await this.service.updateOneBy(
      { id: request.params.id } as Partial<Entity>,
      request.body
    );

    return this.toSuccessResponse(
      entity,
      'Entity updated'
    );
  }

  protected async deleteOne(request: GetOneRequest): Promise<SuccessResponse> {
    await this.service.softDeleteOneBy({
      id: request.params.id
    } as Partial<Entity>);

    return this.toSuccessResponse(
      {},
      'Entity deleted'
    );
  }
}
