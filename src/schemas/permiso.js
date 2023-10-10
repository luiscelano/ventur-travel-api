import SimpleSchema from 'simpl-schema'

export const Permiso = new SimpleSchema({
  idTipoUsuario: Number,
  descripcion: String,
  createdAt: Date,
  updatedAt: Date
})
