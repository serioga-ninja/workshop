import { validate, type ValidatorOptions } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ApiValidationError } from '../classes/errors';

type EntitySchema = {
  new (...args: any[]): any;
};

@injectable()
export default class Middlewares {
  validateParams(Schema: EntitySchema, validatorOptions?: ValidatorOptions) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const schema = new Schema(req.params);
      const errors = await validate(schema, validatorOptions);

      if (errors.length) {
        throw new ApiValidationError(errors);
      }

      req.params = schema;

      next();
    };
  }

  validateQuery(Schema: EntitySchema, validatorOptions?: ValidatorOptions) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const schema = new Schema(req.query);
      const errors = await validate(schema, validatorOptions);

      if (errors.length) {
        throw new ApiValidationError(errors);
      }

      req.query = schema;

      next();
    };
  }

  validateBody(Schema: EntitySchema, validatorOptions?: ValidatorOptions) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const schema = new Schema(req.body);
      const errors = await validate(schema, validatorOptions);

      if (errors.length) {
        throw new ApiValidationError(errors);
      }

      req.body = schema;

      next();
    };
  }
}
