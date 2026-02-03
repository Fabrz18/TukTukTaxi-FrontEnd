import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {CommonModule, Location} from '@angular/common';

/* ANGULAR MATERIAL */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

/* SERVICIOS Y MODELOS */
import { DriverService } from '../../services/DriverService';
import { VehicleService } from '../../services/VehicleService';
import { Vehicle } from '../../model/Vehicle';
import { Driver } from '../../model/Driver';

@Component({
  selector: 'app-driver.registration',
  standalone: true,
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
  styleUrls: ['./driver.registration.css'],
})
export class DriverRegistration implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private driverService = inject(DriverService);
  private vehicleService = inject(VehicleService);

  isLinear = true;

  allVehicles: Vehicle[] = [];
  uniqueBrands: string[] = [];
  availableModels: string[] = [];

  personalFormGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
    dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^9[0-9]{8}$/)]],
    password:['', Validators.required],
  });

  vehicleFormGroup = this._formBuilder.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    plate: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-[0-9]{3}$/)]]
  });
  private location = inject(Location);

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.allVehicles = vehicles;
      const brandsWithDuplicates = vehicles.map(v => v.brand);
      this.uniqueBrands = [...new Set(brandsWithDuplicates)];
    });

    this.vehicleFormGroup.get('brand')?.valueChanges.subscribe(selectedBrand => {
      if (selectedBrand) {
        this.availableModels = this.allVehicles
          .filter(v => v.brand === selectedBrand)
          .map(v => v.model);

        this.vehicleFormGroup.get('model')?.setValue('');
      }
    });
  }

  submitRegistration() {
    if (this.personalFormGroup.valid && this.vehicleFormGroup.valid) {

      const selectedBrand = this.vehicleFormGroup.value.brand;
      const selectedModel = this.vehicleFormGroup.value.model;

      const foundVehicle = this.allVehicles.find(v =>
        v.brand === selectedBrand && v.model === selectedModel
      );

      if (foundVehicle && foundVehicle.id) {
        this.registerDriver(foundVehicle);
      } else {
        alert('Error: El modelo seleccionado no se encuentra en la base de datos.');
        console.error('Vehículo no encontrado:', selectedBrand, selectedModel);
      }
    }
  }

  private registerDriver(foundVehicle: Vehicle) {
    const driverData: Driver = {
        vehicle: foundVehicle,
      dni: this.personalFormGroup.value.dni!,
      fullName: this.personalFormGroup.value.fullName!,
      bikePlate: this.vehicleFormGroup.value.plate!,
      phoneNumber: this.personalFormGroup.value.phoneNumber!,
      email: this.personalFormGroup.value.email!,
      password: this.personalFormGroup.value.password!,

      rate: 5.0,
      balance: 0.0,
      status: true
    };

    console.log('Enviando datos al Backend:', driverData);

    this.driverService.createDriver(driverData).subscribe({
      next: (res) => {
        alert('¡Bienvenido al equipo! Registro completado.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error registrando conductor', err);
        alert('Hubo un error al procesar tu registro. Verifica que el DNI o Placa no estén duplicados.');
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
