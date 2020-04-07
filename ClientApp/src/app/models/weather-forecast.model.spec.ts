import { WeatherForecast } from './weather-forecast.model';

export function getTestForecasts(): WeatherForecast[] {
    return [getTestForecast()];
}

export function getTestForecast(): WeatherForecast {
    return <WeatherForecast> {
        date: '1/1/2000',
        temperatureC: 16.66,
        temperatureF: 62,
        summary: 'summary'
    };
}
