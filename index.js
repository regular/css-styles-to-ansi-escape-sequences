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
      if (typeof x == 'object') return JSON.stringify(x)
      return String(x)
    }
    const sprintf = Sprintf(parseCSS, stringify)
    return sprintf.apply(null, arguments) + format.reset()
  }
  return log
}

