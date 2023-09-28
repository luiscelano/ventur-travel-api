const env = process.env.NODE_ENV || 'development'

export default async () => {
  const config = await import(`./${env}`)
  return { ...config.default }
}
