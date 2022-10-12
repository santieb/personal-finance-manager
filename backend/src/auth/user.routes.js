import express from 'express'
import userCtrl from './controllers/user.controller.js'
const router = express.Router()

router
  .post('/register', userCtrl.registerUser)
  .post('/login', userCtrl.login)

export default router
