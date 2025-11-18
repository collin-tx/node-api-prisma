export class AppError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    const status = err.statusCode || 500;
  
    res.status(status).json({
      status: "error",
      message: err.message ?? "Something went wrong",
    });
  };
  