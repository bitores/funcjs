let {
  throttle,
  once,
  limit,
  delay
} = require("./index.js")

function a() {
  console.log('a')
}

dd = throttle(a, 500)

console.log(dd.toString())

da = delay(a, 5000)


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