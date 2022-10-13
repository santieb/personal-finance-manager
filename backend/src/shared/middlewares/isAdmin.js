import { ErrorObject } from '../error.js'

const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user
    if (role === false) throw new ErrorObject('you do not have permission to perform this action', 401)
    next()
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

export default isAdmin
