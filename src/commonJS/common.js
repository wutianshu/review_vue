// 去除对象中属性值为空的属性
function cleanObjNullProperty (myObj) {
  let newObj = {}
  for (let key in myObj) {
    if (typeof myObj[key] === 'undefined' || myObj[key] === null) {
      continue
    }
    try {
      if (myObj[key].length !== 0) {
        newObj[key] = myObj[key]
      }
    } catch (err) {
      console.log(err)
      console.log('key=' + key)
      console.log('value=' + myObj[key])
      continue
    }
  }
  return newObj
}

export default {
  cleanObjNullProperty
}
