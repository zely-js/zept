import { createServer } from 'http';

import type { CustomServer } from '$http';

export function defaultServer(): CustomServer {
  return {
    createServer,
  };
}
