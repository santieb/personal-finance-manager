import categoryService from '../services/category.service.js'
import { ErrorObject } from '../../shared/error.js'
import sucessResponse from '../../shared/sucessResponse.js'

const getCategories = async (req, res) => {
  try {
    const response = await categoryService.getCategories()
    if (response.length === 0) throw new ErrorObject('Not Found', 404)

    sucessResponse({
      res,
      status: 200,
      message: 'Categories successfully obtained',
      data: response
    })
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

    sucessResponse({
      res,
      status: 200,
      message: 'Category created successfully',
      data: response
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { idCategory } = req.params
    const response = await categoryService.deleteCategory(idCategory)

    sucessResponse({
      res,
      status: 200,
      message: 'Category deleted successfully',
      data: response
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

export default { getCategories, createCategory, deleteCategory }
