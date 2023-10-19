import { NextFunction, Request, Response } from 'express';

import { IRes, Res } from '../utils';
import { Controller } from './controller';

export function route<T extends Controller, M extends keyof T>(
  controller: new () => T,
  handler: T[M] extends (req: Request) => Promise<IRes> ? M : never
) {
  return async function (req: Request, _: Response, next: NextFunction) {
    try {
      req.result = await new controller()[handler](req);
    } catch (e) {
      console.error('error occurred :: ', e);
      req.result = e instanceof Res ? e : Res.serverError();
    }

    next();
  };
}