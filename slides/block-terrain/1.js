var raf = require('raf')
var Color = require('color')
var Isomer = require('isomer')
var ease = require('ease-component')
var Simplex = require('perlin-simplex')

var simplex = new Simplex()

var Point = Isomer.Point
var Shape = Isomer.Shape

var cOrange = Color('#F27300')
cOrange.darken(0.5)

module.exports = function(el) {
  el.innerHTML = ''

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  el.appendChild(canvas)

  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  var duration = 20000

  var iso = new Isomer(canvas)

  var nRows = 10
  var nCols = 10
  var nCells = nRows * nCols
  var unit = 6/nRows

  var oWidth = 2
  var oHeight = 2
  var oSpeed = 15

  function render (p) {
    ctx.clearRect(0, 0, width, height)

    for (var row = nRows; row > 0; row--) {
      for (var col = nCols; col > 0; col--) {
        var oX = (col/nCols) * oWidth - (p*oSpeed)
        var oY = (row/nRows) * oHeight - (p*oSpeed)
        var oZ = p * oSpeed

        var mod = simplex.noise(oX, oY)/2 + 0.5

        var w = unit
        var d = unit
        var h = unit

        var x = row * w
        var y = col * w
        var z = 1.2 * mod * unit

        var pos = Point(x, y, z)
        var c = cOrange.clone().lighten(1.2 * mod)
        var ic = new Isomer.Color(c.red(), c.green(), c.blue())
        var shape = Shape.Prism(pos, w, d, h)

        iso.add(shape, ic)
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
