import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.page.html',
  styleUrls: ['./tema.page.scss'],
})
export class TemaPage implements OnInit {
  themeToggleChecked: boolean = false ;
  constructor() { }

  ngOnInit(): void {
    const prefersDark = localStorage.getItem('theme') === 'dark';
    this.themeToggleChecked = prefersDark;
    document.body.classList.toggle('dark', prefersDark);
  }

  toggleTheme(event: any) {
    const darkMode = event.detail.checked;
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }

}