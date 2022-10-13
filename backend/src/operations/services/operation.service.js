import db from '../../config/database.js'
import { ErrorObject } from '../../shared/error.js'

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

export default { createOperation }
