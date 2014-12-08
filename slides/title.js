var text3dParticles = require('text-3d-particles')

module.exports = function(el) {
  el.innerHTML = ''

  var width = window.innerWidth
  var height = window.innerHeight

  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  context = canvas.getContext('2d')

  context.textAlign = 'center'

  context.font = "bold 100px Lobster Two"
  context.fillText('Winning', width/2,    22 * height/64)

  context.font = "bold 50px Lobster Two"
  context.fillText('the', width/2,        27 * height/64)

  context.font = "bold 100px Lobster Two"
  context.fillText('Internet', width/2,   34 * height/64)

  context.font = "bold 50px Lobster Two"
  context.fillText('with', width/2,       39 * height/64)

  context.font = "bold 100px Lobster Two"
  context.fillText('Browserify', width/2, 46 * height/64)

  var opts =
    { canvas: canvas
    , density: 4
    , nodeSize: 7
    , foreground: '#E0D09C'
    , background: '#0E1321'
    , duration: 10000
    , loop: false
    , autoStart: false
    , thetaStart: 0
    , thetaEnd: 2 * Math.PI
    }

  var textGraph = text3dParticles(opts)

  el.appendChild(textGraph.el)
  textGraph.render(0)

  // setTimeout(function() {
  //   textGraph.playing = true
  //   textGraph.timeStart = null
  //   textGraph.animate()
  // }, 2000)

}
