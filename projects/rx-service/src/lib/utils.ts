export function isFunction<T>(value: T): value is T {
  return typeof value === 'function';
}

export function isObject<T>(value: T): boolean {
  return (
    value && value instanceof Object && !isArray(value) && !isFunction(value)
  );
}

export function isArray<T>(value: T): value is T {
  return Array.isArray(value);
}
