import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, text, template }) => {
  const transporterOptions = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    },
    tls: {
      ciphers: 'SSLv3'
    }
  }
  const transporter = nodemailer.createTransport(transporterOptions)

  const info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    text,
    html: template
  })
  if (!info.messageId) throw new Error('Error sending email')

  console.log('message sent:', info.response)
}

export default sendEmail
