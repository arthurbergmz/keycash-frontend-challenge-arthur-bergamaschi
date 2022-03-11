import { Address } from './address';

export interface Building {
  id: string
  address?: Address
  images: string[]
  price: number
  bathrooms: number
  bedrooms: number
  parkingSpaces: number
  usableArea: number
  publish: boolean
}