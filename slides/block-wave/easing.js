var h = require('hyperscript')
var raf = require('raf')
var ease = require('ease-component')

module.exports = function(el) {
  el.innerHTML = ''
  var div = document.createElement('div')
  var h1 = document.createElement('h1')
  h1.classList.add('cli')
  h1.innerHTML = 'npm i -S ease-component'
  div.appendChild(h1)
  el.appendChild(div)

  var height = window.innerHeight
  var rect = div.getBoundingClientRect()
  var y0 = (height - rect.height)/2
  div.style.marginTop = y0 + 'px'

  var duration = 3000

  function render (p) {
    if (p < 0.5) return

    if (p < 0.75) {
      var pe = (p - 0.5)/0.25
      var mod = ease.inExpo(pe)
      var y = (mod * 1.25 * height) + y0
      div.style.marginTop = y + 'px'
      return
    }

    if (p < 1) {
      var pe = (p - 0.75)/0.25
      var mod = ease.outBack(pe)
      var y = (1-mod) * (-height/4) + (mod * y0)
      div.style.marginTop = y + 'px'
      return
    }

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
