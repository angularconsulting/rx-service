export type MyStateOperator<T> = (state: T) => T;

export function isStateOperator<T>(value: T | MyStateOperator<T>): value is MyStateOperator<T> {
  return typeof value === 'function';
}
export function patch<T>(state: T): MyStateOperator<T> {
  return (prevState: T) => {
    return { ...prevState, ...state };
  };
}
