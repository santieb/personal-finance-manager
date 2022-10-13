import express from 'express'
import userRoutes from '../auth/user.routes.js'
import categoryRoutes from '../categories/category.routes.js'
const router = express.Router()

router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)

export default router
