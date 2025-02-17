import type { Request, Response, NextFunction, RequestHandler } from "express";

export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};
