import { NextFunction, Request, Response } from "express";

export const defaultErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  // @ts-ignore
  res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
};
