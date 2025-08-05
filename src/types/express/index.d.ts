import 'express';

declare module 'express-serve-static-core' {
  interface Response {
    ok: (message: string, data?: any, statusCode?: number) => Response;
    fail: (message: string, statusCode?: number, errorDetail?: any) => Response;
  }
}
