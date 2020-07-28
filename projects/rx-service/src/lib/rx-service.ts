import { BehaviorSubject, Observable } from 'rxjs';

export abstract class RxService<T> {
  private localState$: BehaviorSubject<T>;

  protected constructor(defaults: T) {
    this.localState$ = new BehaviorSubject(defaults);
  }

  public get state$(): Observable<T> {
    return this.localState$.asObservable();
  }

  public setState(state: ((prevState: T) => Partial<T>) | Partial<T>): void {
    if (
      typeof state === 'number' ||
      typeof state === 'string' ||
      typeof state === 'boolean' ||
      typeof state === 'bigint' ||
      state === null ||
      state === undefined
    ) {
      this.localState$.next(state);
    } else if (typeof state === 'function') {
      state = (state as (prevState: T) => Partial<T>)(this.getState());
      this.localState$.next(state as T);
    } else {
      this.localState$.next({ ...this.getState(), ...state });
    }
  }

  public getState(): T {
    return this.localState$.getValue();
  }
}
