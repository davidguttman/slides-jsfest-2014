var raf = require('raf')
var Color = require('color')

var cOrange = Color('#F27300')

module.exports = function(el) {
  el.innerHTML = ''

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  el.appendChild(canvas)

  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  var duration = 2000

  function render (p) {
    ctx.clearRect(0, 0, width, height)
    var mod = Math.sin(p * 2 * Math.PI) / 2 + 0.5

    var w = h = width/4
    var x = mod * width/2 + w/2
    var y = height/2 - h/2

    ctx.fillStyle = cOrange.hexString()
    ctx.fillRect(x, y, w, h)
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



