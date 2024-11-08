import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguridadPage } from './seguridad.page';

describe('SeguridadPage', () => {
  let component: SeguridadPage;
  let fixture: ComponentFixture<SeguridadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
