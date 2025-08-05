import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

const validateRequest = <T extends object>(DtoClass: new () => T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoObject = plainToInstance(DtoClass, req.body || {});
      const errors = await validate(dtoObject, { whitelist: true });

      if (errors.length > 0) {
        const formatted = errors.flatMap((err) =>
          err.constraints
            ? Object.values(err.constraints).map((msg) => ({
                field: err.property,
                message: msg,
              }))
            : []
        );

        return res.fail('Validation failed', 400, formatted);
      }

      req.body = dtoObject;
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validateRequest;
