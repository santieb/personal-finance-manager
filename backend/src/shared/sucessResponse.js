const sucessResponse = ({ res, status = 200, message, data, token }) => {
  res.status(status).json({
    status,
    message,
    data,
    token
  })
}

export default sucessResponse
