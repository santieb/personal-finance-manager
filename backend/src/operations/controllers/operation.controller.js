import operationService from '../services/operation.service.js'
import { ErrorObject } from '../../shared/error.js'
import sucessResponse from '../../shared/sucessResponse.js'

const getOperations = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { categoryId, type, page } = req.query

    const response = await operationService.getOperations(userId, categoryId, type, page)
    if (response.length === 0) throw new ErrorObject('Not Found', 404)

    sucessResponse({
      res,
      status: 200,
      message: 'Operations successfully obtained',
      data: response
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err.message)
  }
}

const createOperation = async (req, res) => {
  try {
    const { concept, amount, type, date, categoryId } = req.body
    const { id: userId } = req.user

    const newOperation = {
      concept,
      amount,
      type,
      date,
      userId,
      categoryId
    }

    const response = await operationService.createOperation(newOperation)
    sucessResponse({
      res,
      status: 200,
      message: 'Operation created successfully',
      data: response
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

const updateOperation = async (req, res) => {
  try {
    const { concept, amount, categoryId } = req.body
    const { idOperation } = req.params
    const { id } = req.user

    const operationUpdated = {
      concept,
      amount,
      categoryId
    }

    const response = await operationService.updateOperation(idOperation, operationUpdated, id)

    sucessResponse({
      res,
      status: 200,
      message: 'Operation updated successfully',
      data: response
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

const deleteOperation = async (req, res) => {
  try {
    const { idOperation } = req.params
    const { id } = req.user

    const response = await operationService.deleteOperation(idOperation, id)

    sucessResponse({
      res,
      status: 200,
      message: 'Operation deleted successfully',
      data: response
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

export default { getOperations, createOperation, updateOperation, deleteOperation }
