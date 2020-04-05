import * as fromFetchNgrx from './fetch-ngrx.actions';

describe('loadFetchNgrxs', () => {
  it('should return an action', () => {
    expect(fromFetchNgrx.loadForecastsNgrx().type).toBe('[FetchNgrx] Load FetchNgrxs');
  });
});
