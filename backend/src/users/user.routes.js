import express from 'express'
import userCtrl from './controllers/user.controller.js'
const router = express.Router()

router.post('/', userCtrl.registerUser)

export default router
