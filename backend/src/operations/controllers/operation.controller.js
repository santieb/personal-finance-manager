import operationService from '../services/operation.service.js'

const getOperations = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { categoryId, type, page } = req.query

    const response = await operationService.getOperations(userId, categoryId, type, page)

    res.send(response)
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err.message)
  }
}

const createOperation = async (req, res) => {
  try {
    const { concept, amount, type, categoryId } = req.body
    const { id: userId } = req.user

    const newOperation = {
      concept,
      amount,
      type,
      userId,
      categoryId
    }

    const response = await operationService.createOperation(newOperation)

    res.send(response)
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err.message)
  }
}

export default { getOperations, createOperation }
