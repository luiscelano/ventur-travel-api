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

export const CreateAccessInput = new SimpleSchema({
  correo: {
    type: String,
    required: true
  },
  id_tipo_usuario: {
    type: Number,
    required: true
  }
})
