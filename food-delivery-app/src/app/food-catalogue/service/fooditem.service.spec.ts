import { TestBed } from '@angular/core/testing';

import { FooditemService } from './fooditem.service';

describe('FooditemService', () => {
  let service: FooditemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooditemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
