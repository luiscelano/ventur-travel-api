import sendEmail from 'services/sendEmail'
import newUserTemplate from 'utils/newUserTemplate'

const initEvents = (appEvents) => {
  appEvents.on('test', (payload) => {
    console.log('test event emmited', payload)
  })

  appEvents.on('accessCreated', async ({ user, payload }) => {
    console.log('access created by:', user)
    const { correo, authorizationCode } = payload
    try {
      const htmlTemplate = await newUserTemplate(authorizationCode)
      await sendEmail({
        to: correo,
        subject: 'Te han dado acceso a la plataforma de Ventur Travel',
        text: '',
        template: htmlTemplate
      })
    } catch (error) {
      console.error('error sending email', error)
    }
  })
  appEvents.on('userCreated', async ({ user, payload }) => {
    console.log('user created:', user)
    const { autorizacion } = payload
    await autorizacion.update({
      aceptado: true
    })
    console.log('authorization updated!')
  })
}

export default initEvents
