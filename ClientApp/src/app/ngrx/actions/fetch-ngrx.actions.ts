import { createAction, props } from '@ngrx/store';

import { WeatherForecast } from '@models/weather-forecast.model';

export const loadForecastsNgrx = createAction(
  '[FetchNgrx] Load FetchNgrxs'
);

export const loadForecastsByCountNgrx = createAction(
  '[FetchNgrx] Load N FetchNgrxs',
  props<{ count: number }>()
);

export const loadForecastsNgrxSuccess = createAction(
  '[FetchNgrx] Load FetchNgrxs Success',
  props<{ forecasts: WeatherForecast[] }>()
);

export const loadForecastsNgrxFailure = createAction(
  '[FetchNgrx] Load FetchNgrxs Failure',
  props<{ error: any }>()
);
