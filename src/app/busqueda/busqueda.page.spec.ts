import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaPage } from './busqueda.page';

describe('SearchPage', () => {
  let component: BusquedaPage;
  let fixture: ComponentFixture<BusquedaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
