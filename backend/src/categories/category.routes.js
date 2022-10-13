import express from 'express'
import categoryCtrl from './controllers/category.controller.js'
const router = express.Router()

router
  .get('/', categoryCtrl.getCategories)
  .post('/', categoryCtrl.createCategory)

export default router
