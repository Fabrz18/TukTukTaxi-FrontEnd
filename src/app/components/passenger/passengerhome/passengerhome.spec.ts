import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Passengerhome } from './passengerhome';

describe('Passengerhome', () => {
  let component: Passengerhome;
  let fixture: ComponentFixture<Passengerhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Passengerhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Passengerhome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
