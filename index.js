const Sprintf = require('./sprintf')
const parseCSSDecls = require('./parse-css-decls')
const Ansi = require('./ansi')

const supportsColor = require('supports-color')
const streamname = 'stdout'
const level = (supportsColor[streamname] && supportsColor[streamname].level) || 0

const ansi = Ansi(level)


function log() {
  const format = ansi()
  function parseCSS(css) {
    const props = parseCSSDecls(css)
    return format(props)
  }
  const sprintf = Sprintf(parseCSS)
  return sprintf.apply(null, arguments) + format.reset()
}

console.log(log('%ci=%d%c, %cs="%s"%c, %cCSS', 'color:yellow;', 5, 'color:inherit;', 'background: blue;', 'hello','background: inherit', 'color: orange;'))

