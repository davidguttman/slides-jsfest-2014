var text3dParticles = require('text-3d-particles')

module.exports = function(el) {
  el.innerHTML = ''

  var width = window.innerWidth
  var height = window.innerHeight
  var fontSize = 100

  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  context = canvas.getContext('2d')

  context.textAlign = 'center'
  context.font = "bold "+80+"px Georgia"
  context.fillText('The Art of', width/2, height/2 - fontSize/2)
  context.font = "bold "+fontSize+"px Georgia"
  context.fillText('Browserify', width/2, height/2 + fontSize/2)

  var opts =
    { canvas: canvas
    , density: 5
    , nodeSize: 16
    , foreground: '#E0D09C'
    , background: '#0E1321'
    , duration: 20000
    , loop: false
    , autoStart: false
    , thetaStart: 0
    , thetaEnd: 2 * Math.PI
    }

  var textGraph = text3dParticles(opts)

  el.appendChild(textGraph.el)
  textGraph.render(0)

  setTimeout(function() {
    textGraph.playing = true
    textGraph.timeStart = null
    textGraph.animate()
  }, 2000)

}
