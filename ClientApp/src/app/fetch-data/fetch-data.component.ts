import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecastService } from '@services/weather-forecast.service';

import { WeatherForecast } from '@models/weather-forecast.model';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(private weather: WeatherForecastService, @Inject('BASE_URL') baseUrl: string) {
    weather.getForecasts().subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}