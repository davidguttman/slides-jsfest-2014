var h = require('hyperscript')

module.exports = function(el) {
  el.innerHTML = ''
  var div = render()
  el.appendChild(div)
  var rect = div.getBoundingClientRect()
  div.style.marginTop = (window.innerHeight - rect.height)/2 + 'px'
}

function render () {
  var html = h('div'
    , h('img', {
        src: '/images/robot-vj.png',
        height: window.innerHeight/2})
    , h('h1', '@theRobotVJ')
    )

  return html
}
