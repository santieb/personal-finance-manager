import db from '../../config/database.js'
import { ErrorObject } from '../../shared/error.js'

const getOperations = async (userId, categoryId, type, page) => {
  const where = { userId, categoryId, type }

  const take = 10
  const skip = (page - 1) * 10 || 0

  return await db.operation.findMany({
    skip,
    take,
    where,
    include: {
      category: true
    }
  })
}

const createOperation = async (newOperation) => {
  const { concept, amount, type, userId, categoryId } = newOperation

  const categoryExists = await db.category.findUnique({ where: { id: categoryId } })
  if (!categoryExists) throw new ErrorObject('category not exists', 404)

  return await db.operation.create({
    data: {
      concept,
      amount: +amount,
      type,
      userId,
      categoryId
    }
  })
}

const updateOperation = async (id, operation, userId) => {
  const { concept, amount, categoryId } = operation

  const operationExists = await db.operation.findUnique({ where: { id } })
  if (!operationExists) throw new ErrorObject('this operation not exists', 404)

  if (operationExists.userId !== userId) throw new ErrorObject('you do not have permission to perform this action', 401)

  const categoryExists = await db.category.findUnique({ where: { id: categoryId } })
  if (!categoryExists) throw new ErrorObject('category not exists', 404)

  return await db.operation.update({
    where: {
      id
    },
    data: {
      concept,
      amount: +amount,
      categoryId
    }
  })
}

const deleteOperation = async (id, userId) => {
  const operation = await db.operation.findUnique({ where: { id } })
  if (!operation) throw new ErrorObject('this operation not exists', 404)

  if (operation.userId !== userId) throw new ErrorObject('you do not have permission to perform this action', 401)

  return await db.operation.delete({ where: { id } })
}

export default { getOperations, createOperation, updateOperation, deleteOperation }
