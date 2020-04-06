import * as fromMyReducers from '@appstore/reducers/fetch-ngrx.reducer';

describe('pure selector', () => {
    it('should return the previous state', () => {
        expect(fromMyReducers.initialState.forecasts).toEqual([]);
      });
});
