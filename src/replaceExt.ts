import path from 'path';

export function replaceExt(filePath: string, ext: string): string {
  if (typeof filePath !== 'string') {
    return filePath;
  }
  if (filePath.length === 0) {
    return filePath;
  }
  if (!ext.startsWith('.')) {
    ext = '.' + ext;
  }

  const newFileName = path.basename(filePath, path.extname(filePath)) + ext;
  return path.join(path.dirname(filePath), newFileName);
}
