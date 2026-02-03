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
          const token = this.authService.getToken();
          if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            let roles: string[] = [];

            if (payload.roles) {
              roles = payload.roles.map((r: string) =>
                r.replace('ROLE_', '').toUpperCase()
              );
            }

            if (roles.includes('CONDUCTOR')) {
              this.router.navigate(['/driver/home']);
            } else if (roles.includes('PASAJERO')) {
              this.router.navigate(['/passenger/home']);
            } else {
              console.log('NO TIENES ROL', roles);
              this.router.navigate(['/home']);
            }

          }


        },
        error: (err) => {
          console.error('Error en el login:', err);
          alert('Error al ingresar');
        }
      });
    }
  }
}
