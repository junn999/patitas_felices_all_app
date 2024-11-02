import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user$: Observable<any> = EMPTY;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/iniciosesionautenticado']))
      .catch(error => console.error('Logout failed', error));
  }
}
