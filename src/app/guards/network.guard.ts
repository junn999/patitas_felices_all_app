import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isOnline = navigator.onLine;
    if (isOnline) {
      return true; 
    } else {
      this.router.navigate(['/e404']); 
      return false;
    }
  }
}