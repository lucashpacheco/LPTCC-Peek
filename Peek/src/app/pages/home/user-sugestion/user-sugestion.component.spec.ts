import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSugestionComponent } from './user-sugestion.component';

describe('UserSugestionComponent', () => {
  let component: UserSugestionComponent;
  let fixture: ComponentFixture<UserSugestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSugestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSugestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
