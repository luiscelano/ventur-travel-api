import SimpleSchema from 'simpl-schema'
import { Permiso } from './permiso'

export const Usuario = new SimpleSchema({
  idUsuario: Number,
  correo: String,
  nombre: String,
  apellido: String,
  dpi: String,
  fechaNacimiento: Date,
  fechaIngreso: Date,
  createdAt: Date,
  updatedAt: Date,
  id_status_vendedor: Number,
  id_tipo_usuario: Number,
  permiso: Permiso
})
