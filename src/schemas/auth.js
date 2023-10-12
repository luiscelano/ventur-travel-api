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

export const UserSignUpInput = new SimpleSchema({
  correo: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  dpi: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  fechaIngreso: {
    type: Date,
    required: true
  },
  id_status_vendedor: {
    type: Number,
    required: true
  }
})
