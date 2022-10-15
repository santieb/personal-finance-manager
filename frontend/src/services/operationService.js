const getOperations = async (token) => {
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
    const res = await fetch('http://localhost:3001/api/operations', requestOptions)
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}

const createOperation = async (operation, token) => {
  console.log(operation, token)
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(operation)
  }

  try {
    const res = await fetch('http://localhost:3001/api/operations', requestOptions)
    const data = await res.json()
    console.log(res)
    return data
  } catch (err) {
    return err
  }
}

export default { getOperations, createOperation }
