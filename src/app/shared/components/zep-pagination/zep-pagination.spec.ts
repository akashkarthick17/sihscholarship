import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZepPaginationComponent } from './zep-pagination.component';

describe('ZepPaginationComponent', () => {
  let component: ZepPaginationComponent;
  let fixture: ComponentFixture<ZepPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZepPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZepPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
