let disable = require("./index.js")

function a() {
  console.log('a')
}

dd = disable(a, 5000)

console.log(dd.toString())

var onceFun = once(a)

onceFun()
onceFun()
onceFun()
onceFun()


var limitFun = limit(a, 4)

limitFun()
limitFun()
limitFun()
limitFun()
limitFun()
limitFun()
limitFun()
limitFun()
limitFun()