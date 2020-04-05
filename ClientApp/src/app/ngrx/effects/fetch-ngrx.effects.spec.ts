import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FetchNgrxEffects } from './fetch-ngrx.effects';

describe('FetchNgrxEffects', () => {
  let actions$: Observable<any>;
  let effects: FetchNgrxEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FetchNgrxEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<FetchNgrxEffects>(FetchNgrxEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
