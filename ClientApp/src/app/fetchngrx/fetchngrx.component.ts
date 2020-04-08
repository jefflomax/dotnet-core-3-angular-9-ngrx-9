import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromStore from '@appstore/reducers';

import { selectForecasts } from '@appstore/selectors/fetch-ngrx.selector';
import { loadForecastsNgrx, loadForecastsByCountNgrx } from '@appstore/actions/fetch-ngrx.actions';

import { WeatherForecast } from '@models/weather-forecast.model';

@Component({
  selector: 'app-fetchngrx',
  templateUrl: './fetchngrx.component.html',
  styleUrls: ['./fetchngrx.component.css']
})
export class FetchngrxComponent implements OnInit {
  data$: Observable<Array<WeatherForecast>>;

  constructor(private store: Store<fromStore.AppState>) {

    this.data$ = this.store
      .pipe(
        // tap(_ => console.log('FetchngrxComponent ctor')),
        select( selectForecasts )
      );
  }

  ngOnInit(): void {
    // This action will be picked up by fetch-ngrx.effects.ts
    // when the data loads, it will the emit a new action to the
    // reducer fetch-ngrx.reducer
    this.store.dispatch( loadForecastsNgrx() );
  }

  public getForecasts(count: number): void {
    // This action also goes to fetch-ngrx.effects.ts, but
    // to a diffent effect which will re-use the same reducer
    // from above
    this.store.dispatch( loadForecastsByCountNgrx({ count: count }));
  }

}
