import fs from 'fs'
import ejs from 'ejs'
import juice from 'juice'
import path from 'path'

export const newUserTemplate = async (authorizationCode) => {
  const templatePath = path.resolve(path.dirname(''), 'src/templates/new-user.html')

  if (!fs.existsSync(templatePath)) throw new Error('html does not exists!')

  const template = fs.readFileSync(templatePath, 'utf-8')
  const html = ejs.render(template, {
    registrationLink: `${process.env.REGISTRATION_REDIRECT_URL}?authorizationCode=${authorizationCode}`
  })
  const htmlWithStylesInlined = juice(html)

  return htmlWithStylesInlined
}

export default newUserTemplate
