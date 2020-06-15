const Sprintf = require('./sprintf')

const sprintf = Sprintf(parseCSS, stringify)

function parseCSS(css) {
  return `{${css}}`
}

function stringify(x) {
  if (typeof x == 'object') return JSON.stringify(x)
  return String(x)
}


console.log(sprintf('i=%d, s="%s", css=%c', 5, 'hello', 'bla', 'extra1', {extra2: true}))
