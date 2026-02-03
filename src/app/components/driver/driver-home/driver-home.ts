import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-driver-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './driver-home.html',
  styleUrl: './driver-home.css',
})
export class DriverHome {
  isOnline = false;
  todayEarnings = 0.00;
  rating = 4.9;
  completedTrips = 0;

  toggleStatus() {
    this.isOnline = !this.isOnline;
    // Aquí iría la lógica para avisar al WebSocket que el conductor está activo
    if(this.isOnline) {
      console.log("Conductor Conectado - Buscando viajes...");
    } else {
      console.log("Conductor Desconectado");
    }
  }

  logout() {
    // Lógica de logout
    console.log("Cerrando sesión...");
  }
}
