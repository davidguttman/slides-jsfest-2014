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

  var duration = 2000

  var iso = new Isomer(canvas)

  var nRows = 20
  var nCols = 20
  var nPlanes = 50
  var nCells = nRows * nCols
  var unit = 6/nRows

  var oWidth = nCols/5
  var oHeight = nRows/5
  var oDist = oWidth/2

  function render (p) {
    ctx.clearRect(0, 0, width, height)

    if (p < 0.5) {
      var p = ease.inOutSine(p*2)
    } else {
      var p = ease.inOutSine((1-p)*2)
    }

    var plane = Math.ceil(p * nPlanes)

    var xPos = 0
    var yPos = 0
    var zPos = plane/nPlanes * oDist

    for (var row = nRows; row > 0; row--) {
      for (var col = nCols; col > 0; col--) {
        var oX = xPos - (col/nCols) * oWidth
        var oY = yPos - (row/nRows) * oHeight
        var oZ = zPos

        var mod = simplex.noise3d(oX, oY, oZ)/2 + 0.5

        var w = unit
        var d = unit
        var h = unit/10

        var x = row * w
        var y = col * w
        var z = plane * h

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
