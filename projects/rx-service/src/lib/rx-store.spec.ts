import { TestBed } from '@angular/core/testing';
import { RxStore } from './rx-store';

interface Counter {
  value: number;
}

const initialState: Counter = { value: 0 };

class CounterService extends RxStore<Counter> {
  constructor() {
    super(initialState);
  }
  reset(): void {
    this.setState(initialState);
  }
}

describe('RxStore', () => {
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

  it('should be return 0', () => {
    expect(service.getState().value).toEqual(0);
  });

  it('should increase count to 1', () => {
    service.setState({ value: service.getState().value + 1 });
    expect(service.getState().value).toEqual(1);
  });

  it('should reset store to initial', () => {
    service.reset();
    expect(service.getState().value).toEqual(0);
  });
});
