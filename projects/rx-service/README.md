# 🔥 RxService

 Power up your application services to simplify component communication scenarios. This is a simple solution that rely on RxJS BehaviorSubject 🐱‍🚀

## 👨‍💻 Example

### service.ts
```  typescript
import { Injectable } from '@angular/core';
import { RxService } from 'rx-service';

interface Counter {
  value: number;
}

const initialState: Counter = { value: 0 };

@Injectable({
  providedIn: 'root',
})
export class CounterService extends RxService<Counter> {
  constructor() {
    super(initialState);
  }
}
```
### component.ts
```  typescript
export class AppComponent {
  counter$: Observable<number>;
  constructor(private service: CounterService) {
    this.counter$ = service.state$.pipe(map((x) => x.value));
  }

  update(value: number): void {
    this.service.setState((old) => ({ value: old.value + value }));
  }
}
```
### template.html
``` html
<button (click)="update(-1)">-1</button>
<span class="value"> {{ counter$ | async }}</span>
<button (click)="update(1)">+1</button>
```

## 💡 Also you can just use primitives 
```  typescript
const initialState = 0;

export class CounterService extends RxService<number> {
  constructor() {
    super(initialState);
  }
}
```

## 🧞‍♂️ Install  
```
yarn add rx-service
```
or
```
npm i rx-service
```
