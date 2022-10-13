import db from '../../config/database.js'
import { ErrorObject } from '../../shared/error.js'

const getCategories = async () => await db.category.findMany()

const createCategory = async (newCategory) => {
  const { categoryName, image } = newCategory

  const categoryExists = await db.category.findUnique({ where: { categoryName } })
  if (categoryExists) throw new ErrorObject('category already exists', 400)

  return await db.category.create({
    data: {
      categoryName,
      image
    }
  })
}

const deleteCategory = async (id) => {
  const categoryExists = await db.category.findUnique({ where: { id } })
  if (!categoryExists) throw new ErrorObject('category not exists', 404)

  return await db.category.delete({ where: { id } })
}

export default { getCategories, createCategory, deleteCategory }
