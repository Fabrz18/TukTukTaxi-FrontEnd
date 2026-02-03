import {Vehicle} from './Vehicle';

export class Driver{
  id?: number;
  vehicle: Vehicle;
  dni: string;
  fullName: string;
  bikePlate: string;
  phoneNumber: string;
  password: string;
  email: string;
  rate: number;
  balance: number;
  status: boolean;
}
