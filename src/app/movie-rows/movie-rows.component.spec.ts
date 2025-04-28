import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRowsComponent } from './movie-rows.component';

describe('MovieRowsComponent', () => {
  let component: MovieRowsComponent;
  let fixture: ComponentFixture<MovieRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieRowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
