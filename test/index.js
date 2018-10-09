let body_reg = /{([\s\S]*)}$/;
let args_reg = /\((.*?)\)/;
let empty_reg = /^(\s)*$/;

function unpack(func) {
  if (typeof func !== 'function') throw new Error('The first parameter is not a function.')
  let funcStr = func.toString()
  funcStr.match(args_reg);
  let args = RegExp.$1;
  funcStr.match(body_reg);
  let body = RegExp.$1;

  return [args, body]
}

function pack(...args) {
  let argsArr = [],
    bodyArr = [];

  args.map((item) => {
    let arr = unpack(item);
    if (empty_reg.test(arr[0]) === false) argsArr.push(arr[0])
    if (empty_reg.test(arr[1]) === false) bodyArr.push(arr[1])
  })

  return new Function(...argsArr.join(",").split(','), bodyArr.join("\r\n"))
}

function disable(func, times) {
  if (typeof func !== 'function') throw new Error('The first parameter is not a function.')

  let [args, body] = unpack(func),
    _timer = null;

  let newArgs = args.split(','),
    newBody = `
      if(_timer===null){
      _timer = setTimeout(()=>{
        clearTimeout(_timer);
        _timer = null;
        },${times});
        ${body};
      }`;

  let ret = [];
  newArgs.map((item) => {
    if (empty_reg.test(item) === false) ret.push(item)
  })


  if (ret.length > 0)
    return new Function(...ret, newBody);
  else
    return new Function(newBody)
}

function a() {
  console.log('a')
}

dd = disable(a, 5000)

console.log(dd.toString())