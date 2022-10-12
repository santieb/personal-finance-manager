import { hash, compare } from 'bcrypt'

const encrypt = async (password) => await hash(password, 8)

const verify = async (password, passwordHashed) => await compare(password, passwordHashed)

export { encrypt, verify }
