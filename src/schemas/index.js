export default () => {
  global.simpleSchemaGlobalConfig = {
    getErrorMessage(error, label) {
      if (error.type === 'required') return `${label} es un campo requerido`
    }
  }
}

export * from './usuario'
export * from './auth'
