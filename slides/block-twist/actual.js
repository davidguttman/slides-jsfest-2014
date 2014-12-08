var h = require('hyperscript')

module.exports = function(el) {
  el.innerHTML = ''
  var video = render()
  el.appendChild(video)
  var rect = video.getBoundingClientRect()
  video.style.marginTop = window.innerHeight/4 + 'px'

  video.addEventListener('playing', function(evt) {
    // video.currentTime = 50
  })
}

function render () {
  var html = h('video', {
      src: '/images/wave-pendulum.mp4',
      height: window.innerHeight/2,
      audio: false,
      autoplay: true
    })

  return html
}
