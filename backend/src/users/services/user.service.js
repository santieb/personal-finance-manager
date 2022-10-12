import db from '../../config/database.js'
import { ErrorObject } from '../../shared/error.js'
import { encrypt, verify } from '../utils/bcrypt.js'

const registerUser = async (user) => {
  const { email, name, password } = user

  const userExists = await db.user.findUnique({ where: { email } })
  if (userExists) throw new ErrorObject('user already exists', 400)

  const passwordHashed = await encrypt(password)

  return await db.user.create({
    data: {
      name,
      email,
      password: passwordHashed
    }
  })
}

export default { registerUser }
