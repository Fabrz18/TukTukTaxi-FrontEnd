import {Passenger} from './Passenger';
import {Driver} from './Driver';

export class Ride {
  id?: number;
  passenger: Passenger;
  driver: Driver;
  distance: number;
  date: Date;
  cost: number;
  originAddress: string;
  originLat: number;
  originLong: number;
  destinityAddress: string;
  destinylat: number
  destinylong: number;
  rate: number;
}
