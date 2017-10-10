import { TestBed, inject } from '@angular/core/testing';

import { CustomNavbarService } from './custom-navbar.service';

describe('CustomNavbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomNavbarService]
    });
  });

  it('should be created', inject([CustomNavbarService], (service: CustomNavbarService) => {
    expect(service).toBeTruthy();
  }));
});
