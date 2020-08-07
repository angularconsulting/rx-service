# 🔥 RxService

 💪 RxService adds reactivity to service classes and simplifying component communication scenarios within your application. This is a simple solution that based on RxJS BehaviorSubject 🐱‍🚀

## 👨‍💻 Example

### service
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
### component class
```  typescript
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  counter$: Observable<number>;
  constructor(private service: CounterService) {}

   ngOnInit(): void {
    this.counter$ = this.service.state$.pipe(map((x) => x.value));
  }

  update(value: number): void {
    this.service.setState((state) => ({ value: state.value + value }));
  }
}
```
### component template
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
