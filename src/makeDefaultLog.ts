import { Logger, LogLevel } from './Logger';

export type LogTarget = { [K in LogLevel]: (message: string) => void };

export function makeDefaultLog(target: LogTarget = console): Logger {
  return (obj, level?: LogLevel): void => {
    if (obj instanceof Error) {
      // source props aren't enumerable so wouldn't be included in JSON
      obj = {
        message: obj.message,
        stack: obj.stack,
        level: level || 'error',
      };
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let reportLevel: LogLevel | undefined = level || (obj as any).level;

    if (!reportLevel || ['info', 'error', 'warn'].indexOf(reportLevel) < 0) {
      reportLevel = 'info';
    }

    target[reportLevel](
      JSON.stringify({
        ...obj,
        level: obj.level || reportLevel,
      }),
    );
  };
}
