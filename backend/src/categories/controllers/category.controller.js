import categoryService from '../servuces/category.service.js'

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

export default { createCategory }
