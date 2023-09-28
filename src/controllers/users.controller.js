import bcrypt from 'bcrypt'
import generateAccessToken from 'utils/generateAccessToken'
import generateRefreshToken from 'utils/generateRefreshToken'
import { refreshTokens } from './auth.controller'

export const users = [] // stored in users table

export const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  console.log('salt', salt)
  console.log('hashedPassword', hashedPassword)
  const user = { username: req.body.username, password: hashedPassword }
  users.push(user)

  const accessToken = generateAccessToken({ username: user.username })
  const refreshToken = generateRefreshToken({ username: user.username })
  refreshTokens.push(refreshToken)
  return res.status(200).json({
    message: 'User created!',
    accessToken,
    refreshToken
  })
}

export const getUsers = (__, res) => res.json({ users })
