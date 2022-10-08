import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeekSugestionComponent } from './peek-sugestion.component';

describe('PeekSugestionComponent', () => {
  let component: PeekSugestionComponent;
  let fixture: ComponentFixture<PeekSugestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeekSugestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeekSugestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
