import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { WeatherForecast } from '@models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  private baseUrl: string ;

  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
      this.baseUrl = baseUrl;
    }

    public getForecasts(): Observable<WeatherForecast[]> {
      return this.httpClient
        .get<WeatherForecast[]>(this.baseUrl + 'weatherforecast')
        .pipe(
          catchError( err => of([]) )
        );
    }

    public getSomeForecasts(count: number): Observable<WeatherForecast[]> {
      return this.httpClient
        .get<WeatherForecast[]>(this.baseUrl + `weatherforecast/getsome/${count}`)
        .pipe(
          catchError( err => of([]) )
        );
    }
}
