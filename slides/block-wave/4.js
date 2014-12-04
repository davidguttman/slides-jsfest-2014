var raf = require('raf')
var Color = require('color')
var Isomer = require('isomer')

var Point = Isomer.Point
var Shape = Isomer.Shape

var cOrange = Color('#F27300')

module.exports = function(el) {
  el.innerHTML = ''

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  el.appendChild(canvas)

  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  var duration = 2000

  var iso = new Isomer(canvas)

  function render (p) {
    ctx.clearRect(0, 0, width, height)
    var mod = Math.sin(p * 2 * Math.PI) / 2 + 0.5
    var w = 0.5
    var d = 2 * mod + 1
    var h = 2 * mod + 1
    var x = 1
    var y = 1 - d/2
    var z = 3 - h/2
    var pos = Point(x, y, z)
    var c = new Isomer.Color(cOrange.red(), cOrange.green(), cOrange.blue())
    iso.add(Shape.Prism(pos, w, d, h), c)
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
