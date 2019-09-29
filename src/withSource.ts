import { modulePath } from './modulePath';
import { replaceExt } from './replaceExt';

export interface HandlerSource {
  modulePath: string;
  handler: string;
}

export interface SourceProps {
  source: HandlerSource;
}

export type WithSource<T> = T & SourceProps;

export function withSource<T>(
  filename: string,
  name: string,
  handler: T,
): WithSource<T> {
  const ret: T & Partial<SourceProps> = handler;
  const moduleSrc = modulePath(filename);

  ret.source = {
    modulePath: moduleSrc.rootPath,
    handler: replaceExt(moduleSrc.filePath, name),
  };

  return ret as WithSource<T>;
}
