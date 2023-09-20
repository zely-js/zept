import { Request, Response } from '@zept/http';

export type Handler = (req: Request, res: Response) => void | Promise<void>;

export type RouteModule = Handler | Record<string, Handler>;

export interface Route {
  path: string;
  module: RouteModule;
  id?: symbol;
}
