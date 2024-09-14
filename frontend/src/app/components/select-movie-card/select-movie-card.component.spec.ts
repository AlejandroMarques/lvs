import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMovieCardComponent } from './select-movie-card.component';

describe('SelectMovieCardComponent', () => {
  let component: SelectMovieCardComponent;
  let fixture: ComponentFixture<SelectMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMovieCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
