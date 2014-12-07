var raf = require('raf')
var ease = require('ease-component')
var Color = require('color')

module.exports = function(el) {
  el.innerHTML = ''
  var div = document.createElement('div')
  var h1 = document.createElement('h1')
  h1.classList.add('cli')
  h1.innerHTML = 'npm i -S color'
  div.appendChild(h1)
  el.appendChild(div)

  var height = window.innerHeight
  var rect = div.getBoundingClientRect()
  var y0 = (height - rect.height)/2
  div.style.marginTop = y0 + 'px'

  var initColor = Color('red')

  var duration = 3000

  function render (p) {
    var c = initColor.clone()

    if (p < 0.5) {
      c.mix(Color('yellow'), p*2)
    } else {
      c.mix(Color('yellow'), (1-p)*2)
    }

    div.style.color = c.hexString()

  }

  var timeStart = Date.now()
  function tick () {
    if (!div.parentNode) return
    var elapsed = Date.now() - timeStart
    var p = (elapsed % duration) / duration
    render(p)
    raf(tick)
  }

  tick()

}
