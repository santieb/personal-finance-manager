import db from '../../config/database.js'
import { ErrorObject } from '../../shared/error.js'
import { encrypt, verify } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'

const registerUser = async (user) => {
  const { email, name, password } = user

  const userExists = await db.user.findUnique({ where: { email } })
  if (userExists) throw new ErrorObject('user already exists', 400)

  const passwordHashed = await encrypt(password)

  return await db.user.create({
    data: {
      name,
      email,
      password: passwordHashed,
      isAdmin: true
    }
  })
}

const login = async (credentials) => {
  const { email, password } = credentials

  const user = await db.user.findUnique({ where: { email } })
  if (!user) throw new ErrorObject('Your email and password do not match. Try again', 401)

  const { id, isAdmin, password: passwordHashed } = user

  const isMatch = await verify(password, passwordHashed)
  if (!isMatch) throw new ErrorObject('Your email and password do not match. Try again', 401)

  const token = await generateToken(id, isAdmin)
  return { user, token }
}

export default { registerUser, login }
