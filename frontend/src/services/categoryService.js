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
    const res = await fetch('http://localhost:3001/api/categories', requestOptions)
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}

export default { getCategories }
