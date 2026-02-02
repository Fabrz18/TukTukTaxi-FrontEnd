import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../services/authservice';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatFormField, MatLabel, MatIcon, MatInput, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

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
