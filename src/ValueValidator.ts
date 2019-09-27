export interface ValueValidator<T> {
  (value: unknown): { ok: true; value: T } | { ok: false; errors: unknown };
}
