import { Geolocation } from './geolocation';

export interface Address {
  formattedAddress: string;
  geolocation: Geolocation;
}