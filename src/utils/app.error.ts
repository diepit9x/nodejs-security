// export class HttpException extends Error {
//   statusCode: number;
//   errorDetail?: any;

//   constructor(message: string, statusCode = 500, errorDetail?: any) {
//     super(message);
//     this.statusCode = statusCode;
//     this.errorDetail = errorDetail;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

class AppError extends Error {
  statusCode: number;
  errorDetail?: any;

  constructor(message: string, statusCode: number = 500, errorDetail?: any) {
    super(message);
    this.statusCode = statusCode;

    // Đảm bảo name của lỗi là tên class
    this.name = this.constructor.name;

    this.errorDetail = errorDetail;

    // Giúp Express phân biệt lỗi custom với lỗi không mong đợi
    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
