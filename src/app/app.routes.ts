import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Home} from './components/home/home';
import {DriverRegistration} from './components/driver.registration/driver.registration';
import {Register} from './components/register/register';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'login', component: Login},
  {path: 'home', component: Home},
  {path: 'became-a-driver', component: DriverRegistration},
  {path: 'register', component: Register},
];
