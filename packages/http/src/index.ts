import { ServerConstructorOptions } from '$http/types';

import { ZeptServer } from './server';

function osik(options?: ServerConstructorOptions) {
  return new ZeptServer(options);
}

export { osik, ZeptServer };

export * from './middlewares';
