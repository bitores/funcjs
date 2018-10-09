let disable = require("./index.js")

function a() {
  console.log('a')
}

dd = disable(a, 5000)

console.log(dd.toString())