import jwt from 'jsonwebtoken'
import { config } from '../../config/index.js'
const { secretKey } = config

const generateToken = (payload) => jwt.sign({ id: payload }, secretKey, { expiresIn: 60 * 60 })

export { generateToken }
