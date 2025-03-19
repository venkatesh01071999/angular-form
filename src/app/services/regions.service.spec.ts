import { TestBed } from '@angular/core/testing';

import { RegionsService } from './regions.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RegionsService', () => {
  let service: RegionsService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(RegionsService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
});
