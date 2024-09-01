import { TestBed } from '@angular/core/testing';

import { BrownHairUsersService } from './brown-hair-users.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BrownHairUsersService', () => {
  let service: BrownHairUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BrownHairUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
