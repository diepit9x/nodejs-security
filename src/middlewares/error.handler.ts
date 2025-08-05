// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.errorDetail || null;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null,
    errors: details,
  });
};
export default errorHandler;
