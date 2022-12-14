import express from 'express'
import operationCtrl from './controllers/operation.controller.js'
import isAuth from '../shared/middlewares/isAuth.js'
const router = express.Router()

router
  .use(isAuth)
  .get('/', operationCtrl.getOperations)
  .post('/', operationCtrl.createOperation)
  .patch('/:idOperation', operationCtrl.updateOperation)
  .delete('/:idOperation', operationCtrl.deleteOperation)

export default router
