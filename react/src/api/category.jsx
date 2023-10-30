import { fromPairs } from 'lodash'
import { BASE_API } from '../utils/constants'

export async function getCategoryApi() {
  try {
    const url = `${BASE_API}/api/categories/`
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function addCategoryApi(data, token) {
  try {
    // formData receive images
    const formData = new FormData()
    formData.append('image', data.image)
    formData.append('image', data.title)

    const url = `${BASE_API}/api/categories/`
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // send file;
    }

    const response = await fetch(url, params)
    const result = await response.json()
    return response
  } catch (error) {
    throw error
  }
}
