import { TestBed } from '@angular/core/testing';

import { PdfLoaderService } from './pdf-loader.service';

describe('PdfLoaderService', () => {
  let service: PdfLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
