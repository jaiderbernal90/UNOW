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

    // Responder automáticamente a la solicitud que se hace en el constructor
    const req = httpMock.expectOne(`${apiUrl}/positions`);
    req.flush({ positions: [] }); // Puedes ajustar el mock según sea necesario
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

    // Se llama nuevamente a getPositions en la prueba
    service.getPositions();

    const req = httpMock.expectOne(`${apiUrl}/positions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(service.positions()).toEqual(mockPositions);
  });

  it('should handle error when getting positions', () => {
    const consoleSpy = spyOn(console, 'error');

    // Se llama nuevamente a getPositions en la prueba
    service.getPositions();

    const req = httpMock.expectOne(`${apiUrl}/positions`);
    expect(req.request.method).toBe('GET');
    expect(service.positions()).toEqual([]);
  });
});
