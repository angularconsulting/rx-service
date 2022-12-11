# 🔥 Rx Service

 Rx Service library adds reactivity to your services and simplifying component communication scenarios within your application. This is a simple solution that based on RxJS BehaviorSubject 🐱‍🚀

## 👨‍💻 Example

### service
```  typescript
import { Injectable } from '@angular/core';
import { Rx } from 'rx-service';

interface Counter {
  value: number;
}

const initialState: Counter = { value: 0 };

@Injectable({
  providedIn: 'root',
})
export class CounterService extends Rx<Counter> {
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

export class CounterService extends Rx<number> {
  constructor() {
    super(initialState);
  }
}
```

## 🧹 Clean up subscriptions in case not using the async pipe. 
```  typescript

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RxCleanup } from 'rx-service';
import { takeUntil } from 'rxjs';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private service: CounterService,
    private readonly cleanup$: RxCleanup
  ) {}

  ngOnInit(): void {
    this.service.state$
      .pipe(
        takeUntil(this.cleanup$)
        // more operators here
      )
      .subscribe((result) => {
        // more magic here
      });
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
