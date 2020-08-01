import { BehaviorSubject, Observable } from 'rxjs';
import { isStateOperator, MyStateOperator } from './patch';

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

  public setState(stateOrOperator: T | MyStateOperator<T>): void {
    if (isStateOperator(stateOrOperator)) {
      const state = stateOrOperator(this.getState());
      this.localState$.next(state);
    } else {
      this.localState$.next(stateOrOperator);
    }
  }

  public getState(): T {
    return this.localState$.getValue();
  }

  public reset(): void {
    this.localState$.next(this.default);
  }
}
