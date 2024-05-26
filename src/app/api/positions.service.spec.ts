import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PositionsService } from './positions.service';
import { environment } from '@envs/environment';

describe('PositionsService', () => {
  let service: PositionsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiURL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PositionsService]
    });

    service = TestBed.inject(PositionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get positions', () => {
    const mockPositions = ['Position 1', 'Position 2', 'Position 3'];
    const mockResponse = { positions: mockPositions };

    service.getPositions();

    const req = httpMock.expectOne(`${apiUrl}/positions`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    expect(service.positions()).toEqual(mockPositions);
  });

  it('should handle error when getting positions', () => {
    const errorMessage = 'Error getting positions';
    const consoleSpy = spyOn(console, 'error');

    service.getPositions();

    const req = httpMock.expectOne(`${apiUrl}/positions`);
    expect(req.request.method).toBe('GET');

    req.error(new ErrorEvent('Error'), { status: 500, statusText: errorMessage });
    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
    expect(service.positions()).toEqual([]);
  });
});
