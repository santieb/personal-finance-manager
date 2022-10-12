import userService from '../services/user.service.js'

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body

    const newUser = { email, name, password }
    const response = await userService.registerUser(newUser)

    res.send(response)
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = { email, password }
    const response = await userService.login(user)

    res.send(response)
  } catch (err) {
    const status = err.status || 500
    res.status(status).send(err)
  }
}

export default { registerUser, login }
