// https://stackblitz.com/angular/rxqkyjomgjr?file=src%2Fapp%2Fbanner%2Fbanner.component.detect-changes.spec.ts

// click example
// https://stackoverflow.com/questions/40093013/unit-testing-click-event-in-angular

import '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
// https://github.com/angular/angular/blob/master/packages/platform-browser/src/dom/debug/by.ts
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';

import { DebugUtils } from '../../test-utils';

import { FetchngrxComponent } from './fetchngrx.component';
import * as fromStore from '@appstore/reducers';
import * as fromFetchNgrx from '@appstore/reducers/fetch-ngrx.reducer';
import { WeatherForecast } from '@models/weather-forecast.model';
import { getTestForecasts } from '@models/weather-forecast.model.spec';
import { selectForecasts } from '@appstore/selectors/fetch-ngrx.selector';
import { MemoizedSelector } from '@ngrx/store';

describe('FetchngrxComponent', () => {
  let component: FetchngrxComponent;
  let fixture: ComponentFixture<FetchngrxComponent>;
  let mockStore: MockStore;
  let mockSel: MemoizedSelector<fromFetchNgrx.FetchNgrxState, WeatherForecast[]>;

  const fetchNgrxState = <fromFetchNgrx.FetchNgrxState>{ forecasts: getTestForecasts() };
  const initialState = {
    [fromFetchNgrx.fetchNgrxFeatureKey]: fetchNgrxState
  };
  const queryListsElement = () => fixture
    .debugElement
    .queryAll(By.css('#beforeList'))[0]
    .nativeElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ FetchngrxComponent ],
      providers: [ provideMockStore<fromStore.AppState>( { initialState } )]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchngrxComponent);
    mockStore = TestBed.inject( MockStore );
    mockSel = mockStore.overrideSelector( selectForecasts, getTestForecasts() );

    // Get Component test harness
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  it('should create and display', () => {

    // TODO: Could implement builder pattern for NGRX store
    const newState = {
      [fromFetchNgrx.fetchNgrxFeatureKey]: getTestForecasts()
    };

    mockStore.setState( newState );
    mockStore.overrideSelector( selectForecasts, getTestForecasts() );
    mockSel.setResult(getTestForecasts());

    mockStore.refreshState();
    fixture.detectChanges();
    // tick(); this requires fakeAsync

    const allHtml: HTMLElement = fixture.nativeElement;
    expect(allHtml.textContent).toContain('Weather forecast');

    const utils: DebugUtils = new DebugUtils(fixture.debugElement);

    const aboveList = utils.getById('#beforeList');
    expect(aboveList.attributes['id']).toBe('beforeList');

    const rows = utils.getByCss('tr', aboveList );
    expect(rows.length).toBe(1);

    const name = utils.getOneByAttribute('name', 'summary', rows[0] );
    expect(name.nativeElement.innerText).toBe('summary');

  });

  // TODO: Test that clicks the button

});
