import categoryService from '../services/category.service.js'
import { ErrorObject } from '../../shared/error.js'

const getCategories = async (req, res) => {
  try {
    const response = await categoryService.getCategories()
    if (response.length === 0) throw new ErrorObject('Not Found', 404)

    res.send(response)
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

const createCategory = async (req, res) => {
  try {
    const { categoryName, image } = req.body

    const newCategory = { categoryName, image }
    const response = await categoryService.createCategory(newCategory)

    res.send(response)
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

export default { createCategory, getCategories }
