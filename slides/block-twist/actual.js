var h = require('hyperscript')

module.exports = function(el) {
  el.innerHTML = ''
  var video = document.createElement('div')
  video.innerHTML = '<iframe width="640" height="480" src="//www.youtube.com/embed/yVkdfJ9PkRQ?rel=0" frameborder="0" allowfullscreen></iframe>'
  el.appendChild(video)
  var rect = video.getBoundingClientRect()
  video.style.marginTop = window.innerHeight/4 + 'px'
}
