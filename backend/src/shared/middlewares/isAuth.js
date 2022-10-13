import jwt from 'jsonwebtoken'
import { config } from '../../config/index.js'
import { ErrorObject } from '../error.js'
const { secretKey } = config

const isAuth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization
    const token = bearerToken && bearerToken.split(' ')[1]

    if (!token) throw new ErrorObject('Token not valid. Unauthorized', 401)

    jwt.verify(token, secretKey, (err, user) => {
      if (err) throw new ErrorObject('Token not valid. Unauthorized', 403)

      req.user = user
      next()
    })
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

export default isAuth
