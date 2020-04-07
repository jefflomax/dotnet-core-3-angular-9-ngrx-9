import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherForecastService } from '@services/weather-forecast.service';
import { getTestForecasts } from '@models/weather-forecast.model.spec';

describe('WeatherForecastService', () => {
  let injector: TestBed;
  let service: WeatherForecastService;
  let httpMock: HttpTestingController;
  const mockUrl = 'https://my.fake.url/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: 'BASE_URL', useValue: mockUrl},
        {provide: WeatherForecastService, useClass: WeatherForecastService }
      ]
    }).compileComponents();

    injector = getTestBed();
    service = injector.inject(WeatherForecastService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    // Assure that after every test, there are no
    // outstanding Http Requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud get fake forecasts', () => {

    // This call tests the service method
    service.getForecasts().subscribe( forecasts => {
      expect(forecasts).toEqual(getTestForecasts());
    });

    const httpRequest = httpMock.expectOne(`${mockUrl}weatherforecast`);
    expect(httpRequest.request.method).toBe('GET');
    // This is where our test data is injected
    // into the httpMock
    httpRequest.flush(getTestForecasts());
  });
});
