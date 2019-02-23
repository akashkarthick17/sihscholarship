import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLandingPage } from './base-landing.page';

describe('BaseComponent', () => {
  let component: BaseLandingPage;
  let fixture: ComponentFixture<BaseLandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseLandingPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
