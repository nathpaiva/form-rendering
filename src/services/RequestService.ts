import { DataResponse } from '../types'

async function RequestService(): Promise<DataResponse> {
  try {
    const response = await fetch('../../fields.json')
    const data = await response.json()

    return data._embedded
  } catch (error) {
    console.error(error)

    return null
  }
}

export default RequestService
