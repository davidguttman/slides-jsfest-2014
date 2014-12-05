var text3dParticles = require('text-3d-particles')

module.exports = function(el) {
  el.innerHTML = ''

  var width = window.innerWidth
  var height = window.innerHeight
  var fontSize = 50

  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  context = canvas.getContext('2d')

  context.textAlign = 'center'
  context.font = "bold "+fontSize+"px Georgia"
  context.fillText('Winning the Internet', width/2, height/2 - fontSize/2)
  context.font = "bold "+fontSize+"px Georgia"
  context.fillText('with Browserify', width/2, height/2 + fontSize/2)

  var opts =
    { canvas: canvas
    , density: 3
    , nodeSize: 8
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
