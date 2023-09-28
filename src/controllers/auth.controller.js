import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { users } from './users.controller'
import generateAccessToken from '../utils/generateAccessToken'
import generateRefreshToken from '../utils/generateRefreshToken'

export const refreshTokens = [] // will be stored in Redis DB

export const getUsers = (__, res) => res.json({ users })

export const userLogin = async (req, res) => {
  const user = users.find((user) => user.username === req.body.username)

  if (!user) return res.status(404).send('Cannot find user')

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({ username: user.username })
      const refreshToken = generateRefreshToken({ username: user.username })
      refreshTokens.push(refreshToken)
      return res.status(200).json({
        message: 'Signed In!',
        accessToken,
        refreshToken
      })
    } else {
      return res.status(401).send('Wrong password')
    }
  } catch {
    res.status(401).send()
  }
}

export const userLogout = (req, res) => {
  if (!req.body.token.length) return res.status(403).send()
  const index = refreshTokens.findIndex((refreshToken) => refreshToken === req.body.token)
  if (index === -1) return res.status(403).send()
  refreshTokens.splice(index, 1)
  return res.send('Signed Out!')
}

export const getAccessToken = async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(403)
  if (!refreshTokens.includes(refreshToken)) return res.status(403).send('Forbidden')

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ username: user.username })
    res.json({ accessToken: accessToken })
  })
}
