import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sellerRoleGuard } from './seller-role.guard';

describe('sellerRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sellerRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
