import { BASE_API } from '../utils/constants'
export async function loginApi(formValue) {
  try {
    const url = `${BASE_API}/api/auth/login/`
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //   convert object received from 'formValue' to json
      body: JSON.stringify(formValue),
    }

    // response will give consult result
    const response = await fetch(url, params)

    // if response is different from authenticated ... throw error
    if (response.status !== 200) {
      throw new Error('Incorrect user or password')
    }

    // convert response given by petition to json
    const result = await response.json()
    // we could return result from ( const result = await response.json() ) but we spare in different lines so is clearer
    return result
  } catch (error) {
    throw error
  }
}

export async function getMeApi(token) {
  try {
    const url = `${BASE_API}/api/auth/me/`
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function getUsersApi(token) {
  try {
    const url = `${BASE_API}/api/users/`
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function addUserApi(data, token) {
  try {
    const url = `${BASE_API}/api/users/`
    const params = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(url, params)
    const result = await response.JSON()
    return result
  } catch (error) {
    throw error
  }
}

export async function updateUserApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`
    const params = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, params)
    const result = await response.JSON()
    return result
  } catch (error) {
    throw error
  }
}

export async function deleteUserApi(id, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`
    const params = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, params)
    const result = await response.JSON()
    return result
  } catch (error) {
    throw error
  }
}
