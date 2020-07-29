import { TestBed } from '@angular/core/testing';
import { RxService } from './rx-service';

interface Counter {
  value: number;
}

const initialState: Counter = { value: 0 };

class CounterService extends RxService<Counter> {
  constructor() {
    super(initialState);
  }
  reset(): void {
    this.setState(initialState);
  }
}

describe('RxService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: CounterService } ],
    });
    service = TestBed.inject(CounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0', () => {
    expect(service.getState().value).toEqual(0);
  });

  it('should increase count to 1', () => {
    const state = service.getState();
    service.setState({ value: state.value  + 1 });
    expect(service.getState().value).toEqual(1);
  });

  it('should increase count to 2 (shortcut)', () => {
    service.setState((old) => ({ value: old.value + 2 }));
    expect(service.getState().value).toEqual(2);
  });

  it('should reset to initial', () => {
    service.setState((old) => ({ value: old.value + 1 }));
    service.reset();
    expect(service.getState().value).toEqual(0);
  });
});

class PrimitiveService extends RxService<number> {
  constructor() {
    super(0);
  }
  reset(): void {
    this.setState(0);
  }
}

describe('Primitive RxService', () => {
  let service: PrimitiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PrimitiveService }],
    });
    service = TestBed.inject(PrimitiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0', () => {
    expect(service.getState()).toEqual(0);
  });

  it('should increase count to 1', () => {
    const state = service.getState();
    service.setState(state + 1);
    expect(service.getState()).toEqual(1);
  });

  it('should reset to initial', () => {
    service.setState(1);
    service.reset();
    expect(service.getState()).toEqual(0);
  });
});
