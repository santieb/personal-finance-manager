import { config } from './config/index.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './shared/router.js'
import healthCheckRoutes from './config/healthCheck.js'

const { port } = config
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/healthcheck', healthCheckRoutes)
app.use('/api', routes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
