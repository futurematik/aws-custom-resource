import fs from 'fs';
import path from 'path';

export interface ModulePath {
  rootPath: string;
  filePath: string;
}

export function modulePath(filename: string): ModulePath {
  for (
    let dir = path.dirname(filename);
    path.basename(dir) !== 'node_modules';
    dir = path.dirname(dir)
  ) {
    if (fs.readdirSync(dir).indexOf('package.json') >= 0) {
      return {
        rootPath: dir,
        filePath: path.relative(dir, filename),
      };
    }
  }

  throw new Error(`unable to resolve module path '${module}'`);
}
