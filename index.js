const util = require('util')
const Sprintf = require('./sprintf')
const parseCSSDecls = require('./parse-css-decls')
const Ansi = require('./ansi')

module.exports = function(level) {
  const ansi = Ansi(level)

  function log() {
    const format = ansi()
    function parseCSS(css) {
      const props = parseCSSDecls(css)
      return format(props)
    }
    function stringify(x) {
      if (typeof x == 'object') {
        return util.inspect(x, {colors: level > 0})
      }
      return String(x)
    }
    const sprintf = Sprintf(parseCSS, stringify)
    try {
      return sprintf.apply(null, arguments) + format.reset()
    } catch(err) {
      console.error('sprintf errpr:', err.message)
      console.error(['trying to format'].concat(Array.from(arguments)))
      return ''
    }
  }
  return log
}

