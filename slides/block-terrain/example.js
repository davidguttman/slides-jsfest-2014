var raf = require('raf')
var Color = require('color')

var Simplex = require('perlin-simplex')

var simplex = new Simplex()

var cOrange = Color('#F27300')

module.exports = function(el) {
  el.innerHTML = ''

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  el.appendChild(canvas)

  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  var duration = 10000

  var nCols = 20
  var nRows = 20

  function render (p) {
    ctx.clearRect(0, 0, width, height)
    var mod = Math.sin(p * 2 * Math.PI) / 2 + 0.5
    var tW = width/2
    var tH = tW
    var x0 = width/2 - tW/2
    var y0 = height/2 - tH/2

    var w = tW/nCols
    var h = tH/nRows

    for (var col = 0; col < nCols; col++) {
      for (var row = 0; row < nRows; row++) {
        var x = x0 + col * w
        var y = y0 + row * h

        var alpha = simplex.noise3d(col/12, row/12, mod*2)/2 + 0.5

        ctx.fillStyle = 'rgba(255,255,255,'+alpha*alpha+')'
        ctx.fillRect(x, y, 0.75 * w, 0.75 * h)
      }
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



