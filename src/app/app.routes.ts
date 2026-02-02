import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Home} from './components/home/home';
import {DriverRegistration} from './components/driver.registration/driver.registration';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'home', component: Home},
  {path: 'became-a-driver', component: DriverRegistration}
];
