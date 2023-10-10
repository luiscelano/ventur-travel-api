import { ValidationContext } from 'simpl-schema'

/**
 * retrieves a custom message error for every field
 * @param {ValidationContext} schema
 */
export const getSchemaErrors = (schema) => {
  const errors = []
  const validationErrors = schema.validationErrors()
  for (let validationError of validationErrors) {
    errors.push({
      key: validationError.name,
      message: schema.keyErrorMessage(validationError.name)
    })
  }
  return errors
}
