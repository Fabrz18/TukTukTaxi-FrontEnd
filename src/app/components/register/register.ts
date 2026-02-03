import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import {PassengerService} from '../../services/PassengerService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatInputModule,
    MatIconModule, ReactiveFormsModule, FormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  public router = inject(Router);
  private passengerService = inject(PassengerService);

  hidePassword = true;

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    phoneNumber: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { password, confirmPassword, ...data } = this.registerForm.value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const passenger = {
      fullName: data.fullName!,
      email: data.email!,
      dni: data.dni!,
      phoneNumber: data.phoneNumber!,
      password: password!,
      status: true
    };

    this.passengerService.createPassenger(passenger).subscribe({
      next: () => {
        alert('Cuenta creada correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar pasajero');
      }
    });
  }

  goToDriverRegistration() {
    this.router.navigate(['/became-a-driver']);
  }
}
