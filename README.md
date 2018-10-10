# funcjs


- unpack：函数解包，分解为 [argument string, function body]
- pack: 多函数合并，function a + function b = function c
- disable: 函数执行后，一段时间内执行无效果
- once： 函数只能执行一次
- limit：设置函数可执行次数

#### e.g.
```
function demo(x){
  console.log('demo')
}
unpack(demo)
// output: 
["x","console.log('demo')"]

function s(g){
  console.log('g')
}

pack(demo, s)
//output: 
function (x, g) {
  console.log('demo')
  console.log('g')
}


var demoFun = disable(demo, 5000) 
// After the demoFun function is executed, it can be executed again after 5 seconds.

var onceFun = once(demo)
// The onceFun function is executed only once.
 
var limitFun = limit(demo, 6)
// The limitFun function is executed 6 times.


```