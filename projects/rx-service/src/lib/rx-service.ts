import { BehaviorSubject, Observable } from 'rxjs';

export abstract class RxService<T extends object> {
  private localState$: BehaviorSubject<T>;

  protected constructor(defaults: T) {
    this.localState$ = new BehaviorSubject(defaults);
  }

  public get state$(): Observable<T> {
    return this.localState$.asObservable();
  }

  public setState(state: ((old: T) => Partial<T>) | Partial<T>): void {
    if (Object.prototype.toString.call(state) === '[object Function]') {
      state = (state as (old: T) => Partial<T>)(this.getState());
      this.localState$.next(state as T);
    } else {
      this.localState$.next({ ...this.getState(), ...state });
    }
  }

  public getState(): T {
    return this.localState$.getValue();
  }
}
