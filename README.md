# 🔥 Rx Service

Enhance your application services with Rx Service. This is a simple yet powerful library that adds reactivity and consistency to your services while streamlining component communication within your application using the reliable RxJS BehaviorSubject 🐱🦸‍♂️

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
  counter$!: Observable<number>;
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
import { Rx } from "rx-service";

const initialState = 0;

export class CounterService extends Rx<number> {
  constructor() {
    super(initialState);
  }
}
```

## 🧹 Clean up subscriptions for edge cases 
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
created by [angularconsulting.au](https://angularconsulting.au)
