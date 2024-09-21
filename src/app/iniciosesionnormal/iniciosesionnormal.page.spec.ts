import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioSesionNormalPage } from './iniciosesionnormal.page';

describe('IniciarSesionPage', () => {
  let component: InicioSesionNormalPage;
  let fixture: ComponentFixture<InicioSesionNormalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSesionNormalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
