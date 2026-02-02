import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

/* ANGULAR MATERIAS */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-driver.registration',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './driver.registration.html',
  styleUrl: './driver.registration.css',
})
export class DriverRegistration {
  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);

  isLinear = true;

  personalFormGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  vehicleFormGroup = this._formBuilder.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    plate: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]*$')]], // Solo mayúsculas y números
    licenseNumber: ['', Validators.required]
  });

  brands: string[] = ['Honda', 'Yamaha', 'Suzuki', 'Bajaj', 'Wanxin', 'Ronco', 'KTM', 'Otro'];

  submitRegistration() {
    if (this.personalFormGroup.valid && this.vehicleFormGroup.valid) {
      const driverData = {
        ...this.personalFormGroup.value,
        ...this.vehicleFormGroup.value
      };

      console.log('Datos a enviar al Backend:', driverData);

      // Aquí llamarías a tu DriverService.createDriver(driverData)

      alert('¡Registro completado! Revisa tu correo.');
      this.router.navigate(['/']);
    }
  }
}
