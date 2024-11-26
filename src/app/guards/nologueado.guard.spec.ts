import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nologueadoGuard } from './nologueado.guard';

describe('nologueadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nologueadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
