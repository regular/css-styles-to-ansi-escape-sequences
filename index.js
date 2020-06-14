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
    const sprintf = Sprintf(parseCSS)
    return sprintf.apply(null, arguments) + format.reset()
  }
  return log
}

