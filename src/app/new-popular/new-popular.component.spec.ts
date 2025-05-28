import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPopularComponent } from './new-popular.component';

describe('NewPopularComponent', () => {
  let component: NewPopularComponent;
  let fixture: ComponentFixture<NewPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPopularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
