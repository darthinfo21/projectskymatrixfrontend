import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flightsearch1Component } from './flightsearch1.component';

describe('Flightsearch1Component', () => {
  let component: Flightsearch1Component;
  let fixture: ComponentFixture<Flightsearch1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flightsearch1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Flightsearch1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
