import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariosmascotasPage } from './formulariosmascotas.page';

describe('FormulariosmascotasPage', () => {
  let component: FormulariosmascotasPage;
  let fixture: ComponentFixture<FormulariosmascotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosmascotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
