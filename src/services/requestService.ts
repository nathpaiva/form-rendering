import { DataResponse } from '../types'

export async function requestService(): Promise<DataResponse> {
  try {
    const response = await fetch('../../fields.json')
    const data = await response.json()

    return data._embedded
  } catch (error) {
    console.error(error)

    return null
  }
}
