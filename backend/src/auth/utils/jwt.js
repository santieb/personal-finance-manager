import jwt from 'jsonwebtoken'
import { config } from '../../config/index.js'
const { secretKey } = config

const generateToken = (id, role) => jwt.sign({ id, role }, secretKey, { expiresIn: 60 * 60 })

export { generateToken }
