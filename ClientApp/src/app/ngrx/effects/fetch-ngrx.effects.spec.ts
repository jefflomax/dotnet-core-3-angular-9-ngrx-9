import { TestBed } from '@angular/core/testing';
import { Observable, of, ReplaySubject } from 'rxjs';

import { Action } from '@ngrx/store';

import { initialState } from '@appstore/reducers/fetch-ngrx.reducer';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
// NOTE: EffectsTestingModule went away in V4
// https://ngrx.io/guide/migration/v4
import { provideMockActions } from '@ngrx/effects/testing';

// Not sophisticated enough to need this yet
import { hot, cold } from 'jasmine-marbles';

import { HttpClient } from '@angular/common/http';

import { WeatherForecastService } from '@services/weather-forecast.service';
import { WeatherForecast } from '@models/weather-forecast.model';
import { getTestForecasts } from '@models/weather-forecast.model.spec';

import { FetchNgrxEffects } from '@appstore/effects/fetch-ngrx.effects';
import * as forecastActions from '@appstore/actions/fetch-ngrx.actions';

describe('FetchNgrxEffects', () => {
  let effects: FetchNgrxEffects;
  // tslint:disable-next-line: prefer-const
  // let actions$: ReplaySubject<Action>; // Observable<any>;
  let actions$: Observable<any>;

  let httpClientMock: HttpClient;
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
        provideMockActions(() => actions$),
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject<FetchNgrxEffects>(FetchNgrxEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return fake data', () => {
    const testForecasts = getTestForecasts();

    spyOn(httpClientMock, 'get').and.returnValue(of( testForecasts ));
    // spyOn(forecastsMock, 'getForecasts').and.returnValue(of([forecast]));

    actions$ = new ReplaySubject<Action>(1);

    (actions$ as ReplaySubject<Action>).next(forecastActions.loadForecastsNgrx);

    const returnedAction = forecastActions.loadForecastsNgrxSuccess({forecasts: testForecasts});

    // https://ngrx.io/guide/migration/v4
    // https://ngrx.io/guide/effects/testing
    effects.loadForecasts$.subscribe( result => {
      // The effect raised a new action
      expect(returnedAction.type).toEqual(forecastActions.loadForecastsNgrxSuccess.type);

      // with the same data given to the mocked httpClient
      expect(result).toEqual(returnedAction);
      // TODO: Figure out how to cast this or get result to see the props
      const r = result as any ;
      expect(r.forecasts[0].temperatureC).toBe( testForecasts[0].temperatureC);

      // The HttpClient was called
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });

  });
});
