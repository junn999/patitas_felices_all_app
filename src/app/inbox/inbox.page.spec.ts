import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxPage } from './inbox.page';

describe('InboxPage', () => {
  let component: InboxPage;
  let fixture: ComponentFixture<InboxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
