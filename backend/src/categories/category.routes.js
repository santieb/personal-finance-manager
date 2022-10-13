import express from 'express'
import categoryCtrl from './controllers/category.controller.js'
const router = express.Router()

router.post('/', categoryCtrl.createCategory)

export default router
