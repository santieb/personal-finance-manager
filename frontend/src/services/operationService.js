const url = import.meta.env.VITE_BACKEND_URL

const getOperations = async (path, token) => {
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
    const res = await fetch(`${url}/api/${path}`, requestOptions)
    const data = await res.json()
    console.log(data)
    return data
  } catch (err) {
    return err
  }
}

const createOperation = async (operation, token) => {
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
    const res = await fetch(`${url}/api/operations`, requestOptions)
    const data = await res.json()

    return data
  } catch (err) {
    return err
  }
}

const updateOperation = async (operation, token, idOperation) => {
  const requestOptions = {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(operation)
  }

  try {
    const res = await fetch(`${url}/api/operations/${idOperation}`, requestOptions)
    const data = await res.json()
    console.log(res)
    return data
  } catch (err) {
    return err
  }
}

const deleteOperation = async (id, token) => {
  const requestOptions = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }

  try {
    const res = await fetch(`${url}/api/operations/${id}`, requestOptions)
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}

export default { getOperations, createOperation, updateOperation, deleteOperation }
