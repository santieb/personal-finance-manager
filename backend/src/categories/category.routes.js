import express from 'express'
import categoryCtrl from './controllers/category.controller.js'
import isAuth from '../shared/middlewares/isAuth.js'

const router = express.Router()

router
  .use(isAuth)
  .get('/', categoryCtrl.getCategories)
  .post('/', categoryCtrl.createCategory)

export default router
