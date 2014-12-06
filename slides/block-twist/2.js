var raf = require('raf')
var ease = require('ease-component')
var Color = require('color')

var cOrange = '#F27300'

module.exports = function(el) {
  el.innerHTML = ''

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  el.appendChild(canvas)

  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  var duration = 600000

  var nCols = 24
  var nRows = 24
  var nCells = nCols * nRows

  function render (p) {
    p = (p + 0.5) % 1
    ctx.clearRect(0, 0, width, height)
    var i = 0
    for (var row = nCols-1; row >= 0; row--) {
      for (var col = nCols-1; col >= 0; col--) {
        i += 1
        var pi = p*i
        // var pe = (pi + i/nCells) % 1
        var pe = pi % 1

        if (pe < 0.5) {
          var mod = ease.linear(pe*2)
        } else {
          var mod = ease.linear((1-pe)*2)
        }

        var w = width/nCols
        var h = height/nRows
        var x = w * col
        var y = h * row

        var hue = (mod * 360) % 360

        var c = Color().hsl(hue, 75, 50)
        ctx.fillStyle = c.hslString()
        ctx.fillRect(x, y, w, h)
      }
    }
  }

  var timeStart = Date.now()

  function tick () {
    if (!canvas.parentNode) return
    var elapsed = Date.now() - timeStart
    var p = (elapsed % duration) / duration
    render(p)
    raf(tick)
  }

  tick()
}
