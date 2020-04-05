import * as fromStore from '../reducers';
import { createSelector } from '@ngrx/store';

// remember the alias fromStore
export const selectDataState = ( state: fromStore.AppState ) => state.fetchNgrx;

export const selectForecasts = createSelector(
    selectDataState,
    appData => {
        console.log(`in selector ${JSON.stringify(appData.forecasts)}`);

        return appData.forecasts;
    }
);
