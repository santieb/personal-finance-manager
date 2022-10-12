import express from 'express'
import userRoutes from '../users/user.routes.js'
const router = express.Router()

router.use('/users', userRoutes)

export default router
