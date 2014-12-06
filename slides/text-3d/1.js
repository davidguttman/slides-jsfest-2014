var raf = require('raf')
var text3dParticles = require('text-3d-particles')

var duration = 10000

var mouseX = window.innerWidth/2
var clicked = false
window.addEventListener('mousemove', function(evt) { 
  mouseX = evt.clientX 
})

window.addEventListener('click', function(evt) { 
  clicked = !clicked
})


module.exports = function run (el) {
  el.innerHTML = ''

  var width = window.innerWidth
  var height = window.innerHeight

  // setTimeout(function() {
  //   textGraph.playing = true
  //   textGraph.timeStart = null
  //   textGraph.animate()
  // }, 2000)
  var js = createJS()
  el.appendChild(js.el)
  js.render(0)

  var timeStart
  clicked = false
  function tick () {
    if (!js.el.parentNode) return
    if (clicked) {
      // var p = Math.abs(width/2 - mouseX)/width * 2
      var p = ((mouseX/width) + 0.5) % 1
    } else {
      timeStart = timeStart || Date.now()
      var elapsed = Date.now() - timeStart
      var p = (elapsed % duration) / duration
    }

    js.render(p)

    raf(tick)
  }

  tick()

  function createJS () {
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    var fontSize = 150

    context = canvas.getContext('2d')

    context.textAlign = 'center'
    context.font = "bold "+fontSize+"px Helvetica"
    context.fillText('JSFest', width/2, height/2 + fontSize/3)

    var opts = createOpts()
    opts.canvas = canvas

    var textGraph = text3dParticles(opts)

    return textGraph
  }
}

function createOpts () {
  var opts =
    { density: 5
    , nodeSize: 8
    , foreground: '#E0D09C'
    , background: '#0E1321'
    , duration: duration
    , loop: false
    , autoStart: false
    , thetaStart: 0
    , thetaEnd: 2 * Math.PI
    }
  return opts
}
