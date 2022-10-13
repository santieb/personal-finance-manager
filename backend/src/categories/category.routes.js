import express from 'express'
import categoryCtrl from './controllers/category.controller.js'
import isAuth from '../shared/middlewares/isAuth.js'
import isAdmin from '../shared/middlewares/isAdmin.js'

const router = express.Router()

router
  .use(isAuth)
  .get('/', categoryCtrl.getCategories)
  .post('/', isAdmin, categoryCtrl.createCategory)
  .delete('/:idCategory', isAdmin, categoryCtrl.deleteCategory)

export default router
