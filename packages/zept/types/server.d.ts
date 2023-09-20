import { Middleware, Request, Response, ServerNext, ZeptServer } from '@zept/http';
import { Route, Handler } from './routes';

export interface ZeptRequest extends Request {
  params: Record<string, any>;
}

export interface ZeptResponse extends Response {}

export class Server extends ZeptServer {
  routes: Route[];

  page: Handler;

  notfound: Middleware;

  constructor(routes: Route[]);

  pageNotFound(handler: Middleware);

  middleware(req: ZeptRequest, res: ZeptResponse, next: ServerNext): Promise<void>;

  processor(req: ZeptRequest, res: ZeptResponse, next: ServerNext): Promise<void>;

  append(route: Route): symbol;
  remove(id: symbol): Route[];
  edit(id: symbol, route: Route): Route[];
}

export function zept(routes: Route[]): Server;
