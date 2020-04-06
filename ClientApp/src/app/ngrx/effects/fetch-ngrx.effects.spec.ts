import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherForecastService } from '@services/weather-forecast.service';

import { FetchNgrxEffects } from './fetch-ngrx.effects';

describe('FetchNgrxEffects', () => {
  let httpClientMock: HttpClient;
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: FetchNgrxEffects;
  let forecastsMock: WeatherForecastService;

  beforeEach(() => {
    const fakeHandler: any = null;
    httpClientMock = new HttpClient(fakeHandler);
    forecastsMock = new WeatherForecastService(httpClientMock, '');

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientMock },
        {provide: WeatherForecastService, useValue: forecastsMock},
        FetchNgrxEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject<FetchNgrxEffects>(FetchNgrxEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
