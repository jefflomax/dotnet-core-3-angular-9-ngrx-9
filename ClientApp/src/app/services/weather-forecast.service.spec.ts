import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { WeatherForecastService } from '@services/weather-forecast.service';
import { getTestForecasts } from '@models/weather-forecast.model.spec';
import { Type } from '@angular/core';
import { doesNotReject } from 'assert';

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

  it('shoud get fake forecasts', (done: DoneFn) => {

    // This call tests the service method
    service.getForecasts().subscribe( forecasts => {
      expect(forecasts).toEqual(getTestForecasts());
      done();
    });

    const httpRequest = httpMock.expectOne(`${mockUrl}weatherforecast`);
    expect(httpRequest.request.method).toBe('GET');
    // This is where our test data is injected
    // into the httpMock
    httpRequest.flush(getTestForecasts());
  });
});

describe('WeatherService via Spy', () => {
  // https://angular.io/guide/testing
  // "Prefer spies as they are usually the easiest way to mock services."
  // let service: WeatherForecastService;
  let serviceSpy: jasmine.SpyObj<WeatherForecastService>;

  beforeEach( () => {
    const spy = jasmine.createSpyObj(WeatherForecastService.name, ['getForecasts']);

    TestBed.configureTestingModule({
      providers: [
        {provide: WeatherForecastService, useValue: spy},
        {provide: 'BASE_URL', useValue: {} },
        {provide: HttpClient, useValue: {} }
      ]});

    // TODO: find out how to get type from service property
    serviceSpy = TestBed.inject(WeatherForecastService) as jasmine.SpyObj<WeatherForecastService>;
  });

  it('should be created', () => {
    expect(serviceSpy).toBeTruthy();
  });

  it('should return stubbed value from a spy', (done: DoneFn) => {
    // The basic problem with this over simiplified test is
    // all we are checking is the spy returned the give result
    // No actual logic is tested, and that's not good

    serviceSpy.getForecasts
      .and
      .returnValue( of( getTestForecasts()) );

      serviceSpy.getForecasts().subscribe( (results) => {
        expect(results.length).toBe(1);
        done();
      });
  });

});
