import { config } from './config/index.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const { port } = config
const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
