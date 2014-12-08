var raf = require('raf')
var ease = require('ease-component')

module.exports = function(el) {
  el.innerHTML = ''

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  el.appendChild(canvas)

  var width = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  var duration = 4000

  // p is progress between 0 and 1
  function render (p) {
    ctx.clearRect(0, 0, width, height)

    var mod
    if (p < 0.5) {
      mod = ease.outBounce(p*2)
    } else {
      mod = ease.inBounce((1-p)*2)
    }

    var w = (mod * width/4) + ((1-mod) * width/16)
    var h = w

    var x = width/2 - w/2
    var y = height/2 - h/2

    ctx.fillStyle = '#F27300'
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



