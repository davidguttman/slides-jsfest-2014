var raf = require('raf')
var ease = require('ease-component')

var cOrange = '#F27300'

module.exports = function(el) {
  el.innerHTML = ''

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  el.appendChild(canvas)

  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  var duration = 20000

  var nThings = 16

  function render (p) {
    ctx.clearRect(0, 0, width, height)
    for (var i = nThings; i > 0; i--) {
      var pi = p*i
      var pe = (pi + i/nThings/2) % 1

      if (pe < 0.5) {
        var mod = ease.inOutSine(pe*2)
      } else {
        var mod = ease.inOutSine((1-pe)*2)
      }

      var w = (width/nThings)/2
      var h = w
      var x = (i / nThings) * width
      var y = mod * height/2 + height/4

      ctx.fillStyle = '#F27300'
      ctx.fillRect(x, y, w, h)
    }
  }

  var timeStart = Date.now()

  function tick () {
    if (!canvas.parentNode) return
    var elapsed = Date.now() - timeStart
    var p = (Date.now() % duration) / duration
    render(p)
    raf(tick)
  }

  tick()
}
