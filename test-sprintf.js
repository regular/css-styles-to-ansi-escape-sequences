const Sprintf = require('./sprintf')

const sprintf = Sprintf(parseCSS)

function parseCSS(css) {
  return `{${css}}`
}

console.log(sprintf('i=%d, s="%s", css=%c', 5, 'hello', 'bla'))
