import { Response, Request, NextFunction } from 'express';

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  // success
  res.ok = (message: string, data: any = null, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      error: null,
    });
  };

  //fail
  res.fail = (message: string, statusCode = 400, errorDetail: any = null) => {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: null,
      error: errorDetail,
    });
  };
  next();
};
export default responseHandler;
