import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-passengerhome',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  templateUrl: './passengerhome.html',
  styleUrl: './passengerhome.css',
})
export class Passengerhome {
  pickupLocation: string = 'Mi ubicación actual';
  destination: string = '';
  recentPlaces = [
    { name: 'Casa', icon: 'home', address: 'Av. Arequipa 123' },
    { name: 'Trabajo', icon: 'work', address: 'Centro Financiero' },
    { name: 'UPC', icon: 'school', address: 'Campus Villa' }
  ];

  searchDriver() {
    if (!this.destination) {
      alert("Por favor ingresa un destino");
      return;
    }
    console.log(`Buscando moto desde ${this.pickupLocation} hasta ${this.destination}`);
    // Aquí iría la lógica de navegación a la pantalla de "Buscando..."
  }

  selectRecent(address: string) {
    this.destination = address;
  }
}
