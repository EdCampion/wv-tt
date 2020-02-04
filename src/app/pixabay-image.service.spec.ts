import { TestBed } from '@angular/core/testing';
import { PixabayImageService } from './pixabay-image.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PixabayImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: PixabayImageService = TestBed.get(PixabayImageService);
    expect(service).toBeTruthy();
  });
});
