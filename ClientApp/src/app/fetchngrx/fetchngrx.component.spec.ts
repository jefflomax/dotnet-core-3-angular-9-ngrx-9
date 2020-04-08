import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { cold } from 'jasmine-marbles';

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

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and display', () => {
    const newState = {
      [fromFetchNgrx.fetchNgrxFeatureKey]: getTestForecasts()
    };

    mockStore.setState( newState );
    mockStore.overrideSelector( selectForecasts, getTestForecasts() );
    mockSel.setResult(getTestForecasts());

    mockStore.refreshState();
    fixture.detectChanges();
    // tick(); this requires fakeAsync

    const aboveLists = fixture
      .debugElement
      .queryAll(By.css('#beforeList'));
    expect(aboveLists.length).toBe(1);

    const rows = aboveLists[0]
      .queryAll(By.css('tr'));
    expect(rows.length).toBe(1);

    const name = rows[0]
      .query(By.css('[name="summary"]'));
    // console.log(name.nativeElement.innerText);
    expect(name.nativeElement.innerText).toBe('summary');

  });

});
