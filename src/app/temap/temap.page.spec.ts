import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemapPage } from './temap.page';

describe('TemapPage', () => {
  let component: TemapPage;
  let fixture: ComponentFixture<TemapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TemapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
