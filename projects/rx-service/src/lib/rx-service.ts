import { BehaviorSubject, Observable } from 'rxjs';
import { isFunction } from './utils';

export abstract class RxService<T> {
  private localState$: BehaviorSubject<T>;
  private default: T;

  protected constructor(defaults: T) {
    this.localState$ = new BehaviorSubject(defaults);
    this.default = JSON.parse(JSON.stringify(defaults));
  }

  public get state$(): Observable<T> {
    return this.localState$.asObservable();
  }

  public setState(state: ((prevState: T) => Partial<T>) | Partial<T>): void {
    if (isFunction(state)) {
      state = (state as (prevState: T) => Partial<T>)(this.getState());
      this.localState$.next(state as T);
    } else {
      this.localState$.next(state);
    }
  }

  public getState(): T {
    return this.localState$.getValue();
  }

  public resetState(): void {
    this.localState$.next(this.default);
  }
}
