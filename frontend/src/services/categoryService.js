const url = import.meta.env.VITE_BACKEND_URL
const getCategories = async (token) => {
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }

  try {
    const res = await fetch(`${url}/api/categories`, requestOptions)
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}

export default { getCategories }
