import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import {AuthService} from '../../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatInputModule,
    MatIconModule, ReactiveFormsModule, FormsModule,
    MatCheckboxModule, RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  hidePassword = true;
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login exitoso, token guardado:', localStorage.getItem('token'));


          // Intentamos navegar y capturamos el resultado
          this.router.navigate(['/home']).then(nav => {
            console.log('¿Navegación exitosa?:', nav);
          }, err => {
            console.error('Error en navegación:', err);
          });

        },
        error: (err) => {
          console.error('Error en el login:', err);
          alert('Error al ingresar');
        }
      });
    }
  }
}
