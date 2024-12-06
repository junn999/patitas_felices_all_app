import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  selectedChips: { type: string, value: string }[] = [];
  searchResults: any[] = [];
  situacion: string = 'todo';
  especie: string = '';
  color: string = '';
  raza: string = '';
  sexo: string = '';
  razas: string[] = [];
  speciesBreeds: { [key: string]: string[] } = {
    perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Poodle', 'Chihuahua', 'Rottweiler', 'Husky siberiano', 'Yorkshire'],
    gato: ['Siames', 'Persa', 'Bengalí', 'Angora', 'Korat']
  };
  idioma: string = 'es';
  langs = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
  ];

  constructor(private firestoreService: FirestoreService, private translateService: TranslateService) {
    const defaultLang = localStorage.getItem('lang') || 'es';
    this.translateService.setDefaultLang(defaultLang);
    this.translateService.use(defaultLang);
  }

  ngOnInit() {}

  selectSituacion(value: string) {
    this.situacion = value;
    this.addChip('Situación', value);
  }

  selectEspecie(value: string) {
    this.especie = value;
    this.raza = ''; 
    this.razas = this.speciesBreeds[value.toLowerCase()] || [];
    this.addChip('Especie', value);
  }

  selectColor(value: string) {
    this.color = value;
    this.addChip('Color', value);
  }

  selectRaza(value: string) {
    this.raza = value;
    this.addChip('Raza', value);
  }

  selectSexo(value: string) {
    this.sexo = value;
    this.addChip('Sexo', value);
  }

  addChip(type: string, value: string) {
    const existingChip = this.selectedChips.find(chip => chip.type === type);

    if (existingChip) {
      existingChip.value = value; 
    } else {
      this.selectedChips.push({ type, value }); 
    }

    this.search(); 
  }

  removeChip(chip: { type: string, value: string }) {
    this.selectedChips = this.selectedChips.filter(c => c !== chip);

    if (chip.type === 'Situación') this.situacion = 'todo';
    if (chip.type === 'Especie') this.especie = '';
    if (chip.type === 'Color') this.color = '';
    if (chip.type === 'Raza') this.raza = '';
    if (chip.type === 'Sexo') this.sexo = '';

    this.search(); 
  }

  clearAllChips() {
    this.selectedChips = [];
    this.situacion = 'todo';
    this.especie = '';
    this.color = '';
    this.raza = '';
    this.sexo = '';
    this.search(); 
  }

  search() {
    this.searchResults = []; 
    if (this.situacion === 'Pérdida') {
      this.firestoreService.getPostsFromPerdidas().subscribe(posts => {
        this.filterPosts(posts, 'Pérdida');
      });
    } else if (this.situacion === 'Adopción') {
      this.firestoreService.getPostsFromAdopcion().subscribe(posts => {
        this.filterPosts(posts, 'Adopción');
      });
    } else {
      this.firestoreService.getPostsFromPerdidas().subscribe(perdidas => {
        this.firestoreService.getPostsFromAdopcion().subscribe(adopcion => {
          this.filterPosts([...perdidas, ...adopcion], 'Todo');
        });
      });
    }
  }

  filterPosts(posts: any[], situacion: string) {
    let filtered = posts;
    if (this.especie) {
      filtered = filtered.filter(post => post.especie === this.especie);
    }
    if (this.color) {
      filtered = filtered.filter(post => post.color === this.color);
    }
    if (this.raza) {
      filtered = filtered.filter(post => post.raza === this.raza);
    }
    if (this.sexo) {
      filtered = filtered.filter(post => post.sexo === this.sexo);
    }

    filtered = filtered.map(post => ({ ...post, situacion: situacion === 'Todo' ? post.situacion : situacion }));
    this.searchResults = filtered;
  }
}