import { Route } from '$zept/types';
import { Server } from './server';

export function zept(routes: Route[]) {
  return new Server(routes);
}

export { Server };
