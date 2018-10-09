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

function _handle(func, bodyWraper) {
  if (typeof func !== 'function') throw new Error('The first parameter is not a function.')

  let [args, body] = unpack(func)
  let newArgs = args.split(',');

  let ret = [];
  newArgs.map((item) => {
    if (empty_reg.test(item) === false) ret.push(item)
  })

  if (ret.length > 0)
    return new Function(...ret, bodyWraper(body))();
  else
    return new Function(bodyWraper(body))()
}

function disable(func, ms) {

  let bodyWraper = function (body) {
    return `
      let _timer = null;
      return function (){
        if(_timer===null){
          _timer = setTimeout(()=>{
            clearTimeout(_timer);
            _timer = null;
            },${ms});
            ${body};
          }
      }
    `;
  }

  return _handle(func, bodyWraper)
}

function once(func) {

  let bodyWraper = function (body) {
    return `
      let f = function (){
        if(f.called===false){
            f.called = true;
            ${body};
          }
      }
      f.called = false;
      return f;
    `;
  }

  return _handle(func, bodyWraper)
}

function limit(func, times = 1) {
  let bodyWraper = function (body) {
    return `
      let f = function (){
        if(f.called>0){
            f.called--;
            ${body};
          }
      }
      f.called = ${times};
      return f;
    `;
  }

  return _handle(func, bodyWraper)
}

module.exports = {
  unpack,
  pack,
  disable,
  once,
  limit,
  _handle
};