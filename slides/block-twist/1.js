var raf = require('raf')
var Color = require('color')
var Isomer = require('isomer')
var ease = require('ease-component')

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
  var nThings = 12
  var unit = 6/nThings

  function render (p) {
    ctx.clearRect(0, 0, width, height)
    for (var i = 0; i < nThings; i++) {
      var mod = (p * (i+1)) % 1

      var w = unit
      var d = unit * 6
      var h = unit

      var x = 0
      var y = 0 - d/2
      var z = i * (unit + unit/2)

      var pos = Point(x, y, z)
      var ic = new Isomer.Color(cOrange.red(), cOrange.green(), cOrange.blue())
      var shape = Shape.Prism(pos, w, d, h)

      var rPos = Point(x + w/2, y + d/2, z)
      var rotated = shape.rotateZ(rPos, mod*2*Math.PI)
      iso.add(rotated, ic)
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
