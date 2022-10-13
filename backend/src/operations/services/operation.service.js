import db from '../../config/database.js'
import { ErrorObject } from '../../shared/error.js'

const getOperations = async (userId, categoryId, type, page) => {
  const where = { userId, categoryId, type }

  const take = 10
  const skip = (page - 1) * 10

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

export default { getOperations, createOperation }
