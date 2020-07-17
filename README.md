# 🔥 RxService

Simple RxJS BehaviorSubject wrapper that simplifies component communication in your applications.

## 👨‍💻 Example

### service.ts
```
import { Injectable } from '@angular/core';
import { RxStore } from './rx-service';

interface Counter {
  value: number;
}

const initialState: Counter = { value: 0 };

@Injectable({
  providedIn: 'root',
})
export class CounterService extends RxStore<Counter> {
  constructor() {
    super(initialState);
  }
  reset(): void {
    this.setState(initialState);
  }
}
```
### component.ts
```
export class AppComponent {
  counter$: Observable<number>;
  constructor(private service: CounterService) {
    this.counter$ = service.state$.pipe(map((x) => x.value));
  }

  update(value): void {
    this.service.setState({ value: this.service.getState().value + value });
  }
}
```
### template.html
```
<button (click)="update(-1)">-1</button>
<span class="value"> {{ counter$ | async }}</span>
<button (click)="update(1)">+1</button>
```
## 🧞‍♂️ Install  
```
yarn i rx-service
```
or
```
npm i rx-service`
```
