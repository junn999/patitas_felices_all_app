import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})
export class E404Page implements OnInit {
  isOnline: boolean = true;

  constructor() {}

  ngOnInit() {
    this.checkConnection();

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    window.addEventListener('online', () => {
      this.isOnline = true;
    });
  }

  checkConnection() {
    this.isOnline = navigator.onLine;
  }
}