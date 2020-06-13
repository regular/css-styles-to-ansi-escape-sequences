const debug = require('debug')('bla')
const css = require('css')
debug('start require')
const expandShorthandProperty = require('css-property-parser/src/expandShorthandProperty')
const isInitialValue = require('css-property-parser/src/isInitialValue')
debug('end require')
const parseColor = require('parse-color')


function parseCSSDeclarations(str) {
  const c = css.parse(`dummy {${str}}`)
  if (
    !c || !c.stylesheet || !c.stylesheet.rules ||
    c.stylesheet.rules.length !== 1 ||
    !c.stylesheet.rules[0].declarations
  ) return


  const decls = c.stylesheet.rules[0].declarations.map(decl => {
    const {property, value} = decl
    //console.log(property, value)
    const expanded = expandShorthandProperty(property, value)
    //console.log(expanded)
    for(const [key, value] of Object.entries(expanded)) {
      //console.log(key, value)
      if (value == 'inherit' || isInitialValue(key, value)) {
        expanded[key] = 'initial'
      }
    }
    return expanded
  })

  const combined = Object.assign.apply(Object, decls)
  return combined
}

const decls1 = parseCSSDeclarations('background: red; color: yellow; text-decoration: underline;')
parseColors(decls1)
console.log(decls1)

const decls2 = parseCSSDeclarations('background: inherit; color: initial; text-decoration: none;')
parseColors(decls2)
console.log(decls2)

function parseColors(decls) {
  for(const [key, value] of Object.entries(decls)) {
    if (key.endsWith('color') && value !== 'initial') {
      decls[key] = parseColor(value).rgb
    }
  }
}
