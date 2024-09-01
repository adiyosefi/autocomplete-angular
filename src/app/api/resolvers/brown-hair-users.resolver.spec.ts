import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { brownHairUsersResolver } from './brown-hair-users.resolver';

describe('brownHairUsersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => brownHairUsersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
