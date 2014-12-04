var raf = require('raf')
var Color = require('color')
var Isomer = require('isomer')

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
  var nThings = 8

  function render (p) {
    ctx.clearRect(0, 0, width, height)
    for (var i = nThings; i > 0; i--) {
      var theta = (p + i/nThings) * 2 * Math.PI
      var mod = Math.sin(theta) / 2 + 0.5

      var w = 0.5
      var d = 2 * mod + 1
      var h = 2 * mod + 1
      var x = i - nThings/2
      var y = 1 - d/2
      var z = 3 - h/2
      var pos = Point(x, y, z)
      var c = cOrange.clone().lighten(mod)
      var ic = new Isomer.Color(c.red(), c.green(), c.blue())
      iso.add(Shape.Prism(pos, w, d, h), ic)
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
