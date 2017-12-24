import { TestBed, inject } from '@angular/core/testing';

import { DhanaService } from './dhana.service';

describe('DhanaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DhanaService]
    });
  });

  it('should be created', inject([DhanaService], (service: DhanaService) => {
    expect(service).toBeTruthy();
  }));
});
