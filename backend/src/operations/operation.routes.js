import express from 'express'
import operationCtrl from './controllers/operation.controller.js'
import isAuth from '../shared/middlewares/isAuth.js'
const router = express.Router()

router
  .use(isAuth)
  .post('/', operationCtrl.createOperation)

export default router
