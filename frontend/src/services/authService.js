const register = async ({ email, name, password }) => {
  const data = { email, name, password }

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  try {
    const res = await fetch('http://localhost:3001/api/users/register', requestOptions)
    const userData = await res.json()

    return userData
  } catch (err) {
    return err
  }
}

const login = async ({ email, password }) => {
  const data = { email, password }

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  try {
    const res = await fetch('http://localhost:3001/api/users/login', requestOptions)
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data.token))
    }

    return data
  } catch (err) {
    return err
  }
}
const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default { login, register, logout, getCurrentUser }
