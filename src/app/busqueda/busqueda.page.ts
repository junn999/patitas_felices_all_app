import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-search',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})

export class BusquedaPage implements OnInit {
  selectedChips: { type: string, value: string }[] = [];
  searchResults: any[] = []; // Almacena los resultados de búsqueda
  situacion: string = 'todo';  // Por defecto, buscar en ambas colecciones
  especie: string = '';        // Inicializar con una cadena vacía
  color: string = '';          // Inicializar con una cadena vacía
  raza: string = '';           // Inicializar con una cadena vacía
  sexo: string = '';           // Inicializar con una cadena vacía

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {}

  // Métodos para seleccionar criterios y crear chips
  selectSituacion(value: string) {
    this.situacion = value;
    this.addChip('Situación', value);
  }

  selectEspecie(value: string) {
    this.especie = value;
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
    if (!this.selectedChips.some(chip => chip.type === type)) {
      this.selectedChips.push({ type, value });
    }
  }

  removeChip(chip: { type: string, value: string }) {
    this.selectedChips = this.selectedChips.filter(c => c !== chip);
    // Limpiar el criterio de búsqueda cuando se elimina el chip
    if (chip.type === 'Situación') this.situacion = 'todo';
    if (chip.type === 'Especie') this.especie = '';
    if (chip.type === 'Color') this.color = '';
    if (chip.type === 'Raza') this.raza = '';
    if (chip.type === 'Sexo') this.sexo = '';
  }

  clearAllChips() {
    this.selectedChips = [];
    this.situacion = 'todo';
    this.especie = '';
    this.color = '';
    this.raza = '';
    this.sexo = '';
  }

  // Método de búsqueda
  search() {
    this.searchResults = []; // Limpiar resultados previos
    if (this.situacion === 'Pérdida') {
      this.firestoreService.getPostsFromPerdidas().subscribe(posts => {
        this.filterPosts(posts, 'Pérdida');
      });
    } else if (this.situacion === 'Adopcion') {
      this.firestoreService.getPostsFromAdopcion().subscribe(posts => {
        this.filterPosts(posts, 'Adopción');
      });
    } else{
      this.firestoreService.getPostsFromPerdidas().subscribe(perdidas => {
        this.firestoreService.getPostsFromAdopcion().subscribe(adopcion => {
          this.filterPosts([...perdidas, ...adopcion], 'Todo');
        });
      });
    }
  }

  // Filtrar resultados según los criterios seleccionados
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
    // Añadir situación a cada post
    filtered = filtered.map(post => ({ ...post, situacion: situacion === 'Todo' ? post.situacion : situacion}));
    this.searchResults = filtered;
  }
}
