import { Action, createReducer, on } from '@ngrx/store';
import * as fetchNgrxActions from '@appstore/actions/fetch-ngrx.actions';

import { WeatherForecast } from '@models/weather-forecast.model';


export const fetchNgrxFeatureKey = 'fetchNgrx';

export interface FetchNgrxState {
  forecasts: WeatherForecast[];
}

export const initialState: FetchNgrxState = {
  forecasts: []
};

const fetchNgrxReducer = createReducer(
  initialState,

  on( fetchNgrxActions.loadForecastsNgrxSuccess, (state, { forecasts } ) => {
    console.log(`loadFetchNgrxsSuccess reducer from ${JSON.stringify(state.forecasts)} to ${JSON.stringify(forecasts)}`);

    return ({ ...state, forecasts: forecasts });
  }),

  on( fetchNgrxActions.loadForecastsNgrxFailure, (state, { error }) => {
    console.log(`Error: ${error}`);

    return ({ ...state });
  })
);

export function reducer(state: FetchNgrxState | undefined, action: Action) {
  return fetchNgrxReducer(state, action);
}
