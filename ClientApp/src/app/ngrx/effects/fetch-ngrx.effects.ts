import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as forecastActions from '@appstore/actions/fetch-ngrx.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { WeatherForecastService } from '@services/weather-forecast.service';


@Injectable()
export class FetchNgrxEffects {
  constructor(private actions$: Actions,
    private forcasts: WeatherForecastService ) {
      // console.log('FetchNgrxEffects ctor');
    }

    loadForecasts$ = createEffect( () =>
      this.actions$.pipe(
        ofType( forecastActions.loadForecastsNgrx ),

        tap( _ => console.log('load Fetch by Ngrx')),

        mergeMap( () => this.forcasts.getForecasts()
          .pipe(
            tap( _ => console.log('after getForecasts') ),

            // upon completing the request, raise an action with the data
            // so the reducer will update the state
            map( results => forecastActions.loadForecastsNgrxSuccess({forecasts: results})),

            catchError( (err) => of( {type: forecastActions.loadForecastsNgrxFailure.type, error: err} ))
          )
        )
      )
    );

    // It's completely silly to copy all this code with the only difference being a parameter
    // But at least it makes it clear how to declare multiple effects in a file
    loadCountOfForecasts$ = createEffect( () =>
    this.actions$.pipe(
      ofType( forecastActions.loadForecastsByCountNgrx ),

      tap( parm => console.log(`load Fetch by Ngrx ${parm.count}`)),

      mergeMap( (parm) => this.forcasts.getSomeForecasts(parm.count)
        .pipe(
          tap( _ => console.log('after getForecasts') ),

          map( results => forecastActions.loadForecastsNgrxSuccess({forecasts: results})),

          catchError( (err) => of( {type: forecastActions.loadForecastsNgrxFailure.type, error: err} ))
        )
      )
    )
  );

}
