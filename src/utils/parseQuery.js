const parseQuery = (object) => {
  let result = {}
  for (let key of Object.keys(object)) {
    if (isNaN(object[key])) result[key] = object[key]
    else result[key] = Number(object[key])
  }
  return result
}

export default parseQuery
