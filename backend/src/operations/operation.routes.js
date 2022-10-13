import express from 'express'
import operationCtrl from './controllers/operation.controller.js'
const router = express.Router()

router.post('/', operationCtrl.createOperation)

export default router
