export default function generateRandomCode() {
  const char = '1234567890'
  const serialLength = 20
  let randomCode = ''
  for (let i = 0; i < serialLength; ++i) {
    let randomSingle = char[Math.floor(Math.random() * char.length)]
    randomCode += randomSingle
  }
  return randomCode
}
