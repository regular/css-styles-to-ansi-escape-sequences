# console-with-style

`%c` (CSS styling) support for Node's console.log

## Why?

Firefox, Chrome's and Safari's console support styling `console.log` output with CSS declarations. Node should to!

## How?

It translates CSS styles to ansi escape sequences for the terminal!

## Example

``` js
const supportsColor = require('supports-color')
const level = (supportsColor.stdout && supportsColor.stdout.level) || 0
const format = require('console-with-style')(level)
console.log(format('%ci=%d%c, %cs="%s"%c, %cCSS', 'color:yellow;', 5, 'color:inherit;', 'background: blue;', 'hello','background: inherit', 'color: orange;'))
```

So far, only colors are supported.

## Ok ... why again?

If you forward the output of a browser's console to a process in the terminal, it's nice to see the same colors, for example when using [debug](https://npmjs.org/package/debug).

## License

MIT

