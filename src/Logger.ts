export type LogLevel = 'info' | 'warn' | 'error';
export type Logger = (
  obj: { message: string; [key: string]: unknown } | Error,
  level?: LogLevel,
) => void;
