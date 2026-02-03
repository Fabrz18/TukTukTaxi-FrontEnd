import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Home} from './components/home/home';
import {DriverRegistration} from './components/driver.registration/driver.registration';
import {Register} from './components/register/register';
import {Passengerhome} from './components/passenger/passengerhome/passengerhome';
import {DriverHome} from './components/driver/driver-home/driver-home';
import {AuthGuard} from './guards/auth-guard';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'home', component: Home},
  {path: 'became-a-driver', component: DriverRegistration},
  {path: 'register', component: Register},
  //PATH PARA PASAJEROS
  {
    path: 'passenger/home',
    component: Passengerhome,
    canActivate: [AuthGuard],
    data: { role: 'PASAJEROS' }
  },
  //PATH PARA CONDUCTORES
  {
    path: 'driver/home',
    component: DriverHome,
    canActivate: [AuthGuard],
    data: { role: 'CONDUCTOR' }
  }
];
