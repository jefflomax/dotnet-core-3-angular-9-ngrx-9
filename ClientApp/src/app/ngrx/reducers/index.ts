import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromFetchNgrx from './fetch-ngrx.reducer';

// Should we try to rename this back to State ?
export interface AppState {

  [fromFetchNgrx.fetchNgrxFeatureKey]: fromFetchNgrx.FetchNgrxState;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromFetchNgrx.fetchNgrxFeatureKey]: fromFetchNgrx.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
