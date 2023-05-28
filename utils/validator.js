const bcrypt = require('bcryptjs')

const validateEmail = (email) => {
  const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regexp.test(email)
}

const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const compareHash = async (password, hash) => {
  const valid = bcrypt.compare(password, hash)
  return valid
}

module.exports = {
  validateEmail,
  generateHash,
  compareHash
}