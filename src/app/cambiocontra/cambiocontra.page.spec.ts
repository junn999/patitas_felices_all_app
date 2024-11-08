import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiocontraPage } from './cambiocontra.page';

describe('CambiocontraPage', () => {
  let component: CambiocontraPage;
  let fixture: ComponentFixture<CambiocontraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiocontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
