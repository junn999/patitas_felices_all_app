import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdiomaPage } from './idioma.page';

describe('IdiomaPage', () => {
  let component: IdiomaPage;
  let fixture: ComponentFixture<IdiomaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
