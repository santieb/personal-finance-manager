import express from 'express'
import userRoutes from '../auth/user.routes.js'
import categoryRoutes from '../categories/category.routes.js'
import operationsRoutes from '../operations/operation.routes.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/operations', operationsRoutes)
router.use('/categories', categoryRoutes)

export default router
