var raf = require('raf')
var Isomer = require('isomer')
var ease = require('ease-component')

var Point = Isomer.Point
var Shape = Isomer.Shape

// var cOrange = Color('#F27300')

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

    var mod
    if (p < 0.5) {
      mod = ease.inOutSine(p*2)
    } else {
      mod = ease.inOutSine((1-p)*2)
    }

    var w = 0.5
    var d = (mod * 3) + ((1-mod) * 1)
    var h = d

    var x = 1
    var y = 1 - d/2
    var z = 3 - h/2

    var pos = Isomer.Point(x, y, z)
    var color = new Isomer.Color(242, 115, 0)
    iso.add(Isomer.Shape.Prism(pos, w, d, h), color)
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
