var h = require('hyperscript')

module.exports = function(el) {
  el.innerHTML = ''
  var div = render()
  el.appendChild(div)
  var rect = div.getBoundingClientRect()
  div.style.marginTop = (window.innerHeight - rect.height)/2 + 'px'
}

function render () {
  var html = h('div',
    h('img', {
      src: '/images/chess.gif',
      height: window.innerHeight/2}))

  return html
}
