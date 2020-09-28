import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSeriesComponent } from './carousel-series.component';

describe('CarouselSeriesComponent', () => {
  let component: CarouselSeriesComponent;
  let fixture: ComponentFixture<CarouselSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
