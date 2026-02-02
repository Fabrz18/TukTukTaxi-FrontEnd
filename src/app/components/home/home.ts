import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // Asumo que usas Angular moderno
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    // Si tienes componentes de Login/Registro, se importarían aquí después
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  title = 'TukTukTaxi';

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
