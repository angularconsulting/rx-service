import { BehaviorSubject, Observable } from 'rxjs';

export abstract class RxService<T> {
  private localState$: BehaviorSubject<T>;

  protected constructor(defaults: T) {
    this.localState$ = new BehaviorSubject(defaults);
  }

  public get state$(): Observable<T> {
    return this.localState$.asObservable();
  }

  public setState(state: Partial<T>): void {
    this.localState$.next({ ...this.getState(), ...state });
  }

  public getState(): T {
    return this.localState$.getValue();
  }
}
