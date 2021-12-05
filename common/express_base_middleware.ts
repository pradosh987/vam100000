import { NextFunction, Request, RequestHandler, Response } from "express";
// import { Logger } from "winston";

export interface IRequest extends Request {
  // logger: Logger;
}

export const middleware =
  (
    fn: (req: IRequest, res: Response, next: NextFunction) => Promise<any> | any
  ): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req as IRequest, res, next)).catch(next);
