import jwt from 'jsonwebtoken'
import { config } from '../../config/index.js'
const { secretKey } = config

const generateToken = (payload) => jwt.sign({ data: payload }, secretKey, { expiresIn: 60 * 60 })

export { generateToken }
