import { TestBed } from '@angular/core/testing';
import { RxCleanup } from './rx-cleanup';

describe('RxCleanup', () => {
  let service: RxCleanup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxCleanup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a value on destruction', (done) => {
    service.subscribe(() => {
      done();
    });
    service.ngOnDestroy();
  });

  it('should complete on destruction', (done) => {
    service.subscribe({
      complete: () => {
        done();
      },
    });
    service.ngOnDestroy();
  });
});
