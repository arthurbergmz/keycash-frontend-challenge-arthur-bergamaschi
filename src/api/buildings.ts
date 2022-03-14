import * as api from '.'
import { Building } from '../interfaces/building'

export type BuildingsResponse = Building[]

export async function getAll () {
  return await api.get<BuildingsResponse>('http://5e148887bce1d10014baea80.mockapi.io/keycash/challenge')
}

export async function getAvailable () {
  const response = await api.get<BuildingsResponse>('http://5e148887bce1d10014baea80.mockapi.io/keycash/challenge')

  if (!response.data) {
    return response
  }

  const filteredData = response.data.filter(d => d.publish && d.address)

  return { ...response, data: filteredData }
}

export async function get (filterFn: (building: Building) => boolean) {
  const response = await getAvailable()

  if (!response.data || !filterFn) {
    return response
  }

  const filteredData = response.data?.filter(filterFn)

  return { ...response, data: filteredData }
}
