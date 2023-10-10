import SimpleSchema from 'simpl-schema'

export const LoginInput = new SimpleSchema({
  correo: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  }
})
