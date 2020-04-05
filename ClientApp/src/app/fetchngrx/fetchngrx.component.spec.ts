import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchngrxComponent } from './fetchngrx.component';

describe('FetchngrxComponent', () => {
  let component: FetchngrxComponent;
  let fixture: ComponentFixture<FetchngrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchngrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchngrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
