import { reducer, initialState, FetchNgrxState } from './fetch-ngrx.reducer';
import * as fetchNgrxActions from '@appstore/actions/fetch-ngrx.actions';
import { WeatherForecast } from '@models/weather-forecast.model';
import { getTestForecasts } from '@models/weather-forecast.model.spec';


describe('FetchNgrx Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadForecastsNgrxSuccess', () => {
    it('should return loadForecastsNgrxSuccess', () => {
      const forecasts = getTestForecasts();
      const state = <FetchNgrxState>{ forecasts: forecasts };

      // The new state is passed into the action
      const loadAction = fetchNgrxActions.loadForecastsNgrxSuccess({forecasts: forecasts});

      // The reducer is a pure function, the initial empty state
      // is replaced by the state from the action
      const newState = reducer(initialState, loadAction);

      expect(newState.forecasts[0]).toEqual(forecasts[0]);
    });
  });
});
