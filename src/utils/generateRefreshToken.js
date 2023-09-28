import jwt from 'jsonwebtoken'

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

export default generateRefreshToken
