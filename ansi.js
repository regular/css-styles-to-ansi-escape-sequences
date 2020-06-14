const style = require('ansi-styles')

module.exports = function(level) {
  let setFg, setBg, resetFg, resetBg
  if (level) {
    const setterName = ['', 'ansi', 'ansi256', 'ansi16m'][level]
    setFg = style.color[setterName].rgb
    setBg = style.bgColor[setterName].rgb
    resetFg = style.color.close
    resetBg = style.bgColor.close
  } else {
    setFg = ()=>{}
    setBg = ()=>{}
    resetFg = ''
    resetBg = ''
  }

  function colorCode(properties, propName, set, reset, cleanup) {
    const value = properties[propName]
    if (!value) return ''
    if (value == 'initial') {
      cleanup.delete(reset)
      return reset
    }
    cleanup.add(reset)
    return set.apply(null, value)
  }

  function ansi(properties, cleanup) {
    return [
      colorCode(properties, 'color', setFg, resetFg,cleanup),
      colorCode(properties, 'background-color', setBg, resetBg, cleanup),
    ].join('')
  }

  return function context() {
    let cleanup = new Set()
    
    function format(properties) {
      return ansi(properties, cleanup)
    }
    function reset() {
      return Array.from(cleanup).join('')
    }
    format.reset = reset
    return format
  }
}
