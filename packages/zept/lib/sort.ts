import type { Route } from '$zept/types';

export function sortRoutes(routes: Route[]) {
  const files = {};

  routes.forEach((file) => {
    if (file) {
      const count = (file.path.match(/:/g) || []).length;

      if (!files[count]) files[count] = [];

      files[count].push(file);
    }
  });

  const filesResult: Route[] = [];

  Object.keys(files).forEach((file) => {
    filesResult.push(...files[file]);
  });

  return filesResult;
}
