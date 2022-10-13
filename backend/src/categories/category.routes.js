import express from 'express'
import categoryCtrl from './controllers/category controler.js'
const router = express.Router()

router.post('/', categoryCtrl.createCategory)

export default router
