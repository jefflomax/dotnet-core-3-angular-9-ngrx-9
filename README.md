# dotnet-core-3-angular-9-ngrx-9
dotnet new angular template sample with angular upgraded to 9 and ngrx 9 added


## This is intended to be a SIMPLE example of:
- .NET Core 3.1
- dotnet new angular template
- Angular 9.1
- NGRX 9

It's here because there are just so many out of date examples it can be harder to start with a current (as of April 2020 anyway) codebase than it should be.

## Description for dotnet new angular

[dotnet new angular](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?view=aspnetcore-3.1&tabs=netcore-cli)

### This is the .NET Core SDK

[.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
SDK 3.1.201
dotnet-sdk-3.1.201-win-x64.exe

dotnet --version
> 3.1.201

npm --version
> 6.13.4
node --version
> v12.14.1


You should pick a better name than dnc3ng9ngrx9 for your app, this just makes the versions used clear
```
dotnet new angular -o dnc3ng9ngrx9

cd dnc3ng9ngrx9

dotnet build
```
( This ran npm install in the ClientApp folder )
```
cd ClientApp
NOTE: no dist folder yet
ng --version
> Angular CLI: 8.3.14
> Node: 12.14.1
> Angular: 8.2.12

ng build

ng serve
```
Check app (don't expect Fetch Data to work)

http://localhost:4200

CTRL-C

```
Tweak VS Code setting to exclude the package-lock.json file (who want's to search that?)
code .
File, Preferences, Settings, Workspace (tab), Text Editor, Files, Exclude, Add Pattern
package-lock.json
OR
you can just edit .vscode/settings.json
```
```json
{
    "files.exclude": {
        "package-lock.json": true
    }
}
```
That's all it's doing


cd ..
dotnet run
Check combined .NET & Angular app (including Fetch Data)
https://localhost:5001

( Be sure Git for Windows is installed )
```
git init
git add .
git commit -m "Initial Commit"

git branch angular-9-upgrade
git checkout angular-9-upgrade
```

[Upgrade Angular](https://update.angular.io/)
8 to 9, basic, no other dependencies

cd ClientApp
ng update @angular/core@8 @angular/cli@8

```
git add .
git commit -m "Angular 8 update"

ng update @angular/core @angular/cli
```
NOTE: Typescript is 3.8.3, although the upgrade guide said 3.7, this is fine

ng --version
> Angular: 9.1.0

npm install

ng update

@nguniversal/aspnetcore-engine 8.1.1 -> 8.2.6 ng update @nguniversal/aspnetcore-engine
( This seems to be something to ignore )

ng build
Using the Microsoft template, we expect it to die in vendor-es2015.js in Window_run
To fix this:
	open polyfills.ts, and before the comment Zone JS is required... add
	(window as any).global = window;
	save the file

	open tsconfig.json
	change "target" from "es2015" to "es5"
	save the file
ng build

ng serve
Check app (don't expect Fetch Data to work)

http://localhost:4200

CTRL-C

cd ..

##NOTE: This isn't going to work!  But you can try, maybe it's fixed
dotnet run

Test the app

https://localhost:5001/

If you bring up your trusty developer tools in Chromium Edge or Chrome (F12)
you'll probably see something like:

> VM11:76 Refused to execute inline script because it violates the following Content Security Policy directive: "script-src c.s-microsoft.com/mscc/ assets.msn.com assets.msn.cn 'self' www.bing.com/as/ www.bing.com/s/as/ platform.bing.com/geo/AutoSuggest/v1 'nonce-aelfqLv9NY99uwSJy5BbRWC+ntRsVmi3PPp6pE2VnJE='". Either the 'unsafe-inline' keyword, a hash ('sha256-gmXNRITvAqce7zkm9IpG5fzF/kE2eiZU3GluJiBLKbo='), or a nonce ('nonce-...') is required to enable inline execution

or from dotnet run
> An unhandled exception has occurred while executing the request.
System.TimeoutException: The Angular CLI process did not start listening for requests within the timeout period of 0 seconds. Check the log output for error information

This is because dotnet is watching the output from Angular, and it's not seeing what it used to
We can get around this in several ways, one easy way is to alter the start command in package.json

```
cd ClientApp

	edit package.json, change "start" to look like this:
	"start": "echo forcenewline && ng serve"
	save the file
cd ..
dotnet run
```
Test the app

https://localhost:5001/

NOW we should have the sample on Angular 9.1 and working from ng start or dotnet run
For other sources on these adjustments, see the brilliant folks from cazton.com
[Cazton Migrating to Angular 9](https://www.cazton.com/blogs/technical/migrating-to-angularv9)
And this aspnetcore issue
https://github.com/dotnet/aspnetcore/issues/17277

```
git add .
git commit -m "Angular 9 and dotnet"

git checkout master
```

Very simple NGRX:
```
git checkout -b "addNgrx"

cd ClientApp

npm install @ngrx/schematics --save-dev
````
( This will update angular.json "cli" to add defaultCollection @ngrx/schematics )
```
ng config cli.defaultCollection @ngrx/schematics

ng add @ngrx/store@9
ng add @ngrx/effects@9
ng add @ngrx/entity@9 
ng add @ngrx/store-devtools@9
```
If you haven't added the Redex Devtools extension to Chromium Edge or Chrome, do so
```
ng generate @ngrx/schematics:store State --root --module app.module.ts --statePath ngrx/reducers -d

ng generate component fetchngrx --module app

ng g action ngrx/actions/fetch-ngrx -c -d

ng g reducer ngrx/reducers/fetch-ngrx --reducers index.ts -c -d
```
Inside fetch-ngrx.reducer.ts, rename State to FetchNgrxState or something so it's isn't easily confused with the App State

Microsoft put the WeatherForecast interface inside fetch-data.component.ts.  Let's create a model class and move it there.
```
ng generate interface model/weather-forecast model
```
And let's setup @model and @appstore in tsconfig.json so the includes are nice
Also enable strictNullChecks because it's good stuff
```
    "paths": {
      "@models/*":["./src/app/model/*"],
      "@appstore/*":["./src/app/ngrx/*"]
    },
    "strictNullChecks": true,
```

And in fetch-data.component.ts, import the new model and remove the old interface
```
import { WeatherForecast } from '@models/weather-forecast.model';
```
This is good time to check the app still works, we've only setup some scaffolding for NGRX and moved one interface.

(Just for sanity's sake, dotnet run will do a ng build/serve)
```
ng build

cd ..
dotnet run

ng serve
Check app (Fetch Data still works)
https://localhost:5001
CTRL-C
```
Now let's setup add our new FetchngrxComponent app-fetchngrx so we can see it

in app.module.ts, inside RouterModule.forRoot add:
      { path: 'fetchngrx', component: FetchngrxComponent }

and in nav-menu-component.html, add:
          <li class="nav-item" [routerLinkActive]="['link-active']">
            <a class="nav-link text-dark" [routerLink]="['/fetchngrx']"
              >Fetch NGRX</a>
          </li>

You can dotnet run again and see the menu and very boring empty component


Microsoft put the fetch of the weather forecast data inline, but let's make a service
```
ng generate service services/weather-forecast -d
```
and go add @services to tsconfig.json
```json
      "@services/*":["./src/app/services/*"]
```
And left Microsoft's service fetch code into our new weather-forecast.service.ts
```typescript
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
}
```

Adjust Microsoft's fetch-data.component.ts to use the new service so we know it's all working before we use NGRX:
```typescript
replace
import { HttpClient } from '@angular/common/http';
with
import { WeatherForecastService } from '@services/weather-forecast.service';
```

and adjust the constructor:
```typescript
  constructor(private weather: WeatherForecastService, @Inject('BASE_URL') baseUrl: string) {
    weather.getForecasts().subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
```
re-test the app, Fetch Data should work just the same but now using your new service.


From here, you'll have to follow the code.  You can create effects and reducers via ng generate (remove the -d (--dry-run) if it looks right)
```
ng generate effect ngrx/effects/fetch-ngrx --root -m app.module.ts -d

ng generate reducer ngrx/reducers/fetch-ngrx -m app.module.ts -d
```
You'll have to create the selector from scratch.
