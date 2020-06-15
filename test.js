const format = require('.')(3)

console.log(format('%ci=%d%c, %cs="%s"%c, %cCSS', 'color:yellow;', 5, 'color:inherit;', 'background: blue;', 'hello','background: inherit', 'color: orange;', 'extra'))

console.log('%j %O', {a: 1}, new Date())
