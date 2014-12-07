var raf = require('raf')
var Color = require('color')
var Isomer = require('isomer')
var ease = require('ease-component')
var Simplex = require('perlin-simplex')

var simplex = new Simplex()

var Point = Isomer.Point
var Shape = Isomer.Shape

var cBlue = Color('#00426E')
// cBlue.darken(0.5)

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

  var oWidth = 1
  var oHeight = 1
  var oDist = 2

  function render (p) {
    ctx.clearRect(0, 0, width, height)

    var xPos = Math.sin(p * Math.PI * 2) * oDist
    var yPos = Math.cos(p * Math.PI * 2) * oDist

    for (var row = nRows; row > 0; row--) {
      for (var col = nCols; col > 0; col--) {
        var oX = xPos - (col/nCols) * oWidth
        var oY = yPos - (row/nRows) * oHeight
        // var oZ = zPos

        var mod = simplex.noise(oX, oY)/2 + 0.5

        var w = unit
        var d = unit
        var h = unit

        var x = row * w
        var y = col * w
        var z = mod * mod * unit

        var pos = Point(x, y, z)
        var c = cBlue.clone().lighten(2 * mod * mod)
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
