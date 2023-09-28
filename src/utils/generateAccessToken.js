import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' })
}

export default generateAccessToken
