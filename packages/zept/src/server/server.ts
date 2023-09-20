import { pathToRegexp } from '@zept/path-regexp';
import { ZeptServer } from '@zept/http';

import { parse } from 'url';

import { sortRoutes } from '$zept/lib/sort';

import type { Middleware, ServerNext } from '$http/types';
import type { Handler, ZeptRequest, ZeptResponse } from '$zept/types';
import type { Route } from '$zept/types';

export class Server extends ZeptServer {
  routes: Route[] = [];

  page: Handler;

  notfound: Middleware;

  constructor(routes: Route[]) {
    super();
    this.routes = routes;

    this.use(this.coreMiddleware.bind(this));
    this.useProcessor(this.coreProcessor.bind(this));
    this.useProcessor((req, res, next) => {
      this.notfound(req, res, next);
    });
  }

  pageNotFound(handler: Middleware) {
    this.notfound = handler;

    return this;
  }

  append(route: Route): symbol {
    route.id = Symbol(route.path);
    this.routes.push(route);

    return route.id;
  }

  remove(id: symbol) {
    this.routes = this.routes.filter((route) => route.id !== id);

    return this.routes;
  }

  edit(id: symbol, route: Route) {
    this.routes = this.routes.map((r) => {
      if (r.id !== id) {
        return r;
      }
      return route;
    });

    return this.routes;
  }

  /**
   * Assign `req.params`
   */
  async coreMiddleware(req: ZeptRequest, res: ZeptResponse, next: ServerNext) {
    this.page = null;
    this.routes = sortRoutes(this.routes);

    req.params = {};

    for await (const route of this.routes) {
      const { pattern, params } = pathToRegexp(route.path, false);

      if (pattern.test(parse(req.url).pathname)) {
        if (typeof route.module !== 'object') {
          this.page = route.module;

          const execd = new URL(req.url, `http://${req.headers.host}`).pathname.match(
            pattern
          );

          params.forEach((param, index) => {
            req.params[param] = execd[index + 1] || null;
          });

          await next();

          return;
        }
        for await (const method of Object.keys(route.module)) {
          if (method.toUpperCase() === req.method.toUpperCase()) {
            this.page = route.module[method];

            const execd = new URL(req.url, `http://${req.headers.host}`).pathname.match(
              pattern
            );

            params.forEach((param, index) => {
              req.params[param] = execd[index + 1] || null;
            });

            await next();

            return;
          }
        }
      }
    }
    next();
  }

  async coreProcessor(req: ZeptRequest, res: ZeptResponse, next: ServerNext) {
    this.routes = sortRoutes(this.routes);

    if (this.page) {
      await this.page(req, res);
    } else {
      next();
    }
  }
}
