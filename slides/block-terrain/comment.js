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
      src: '/images/block-terrain-comment.png',
      width: 0.9 * window.innerWidth}))

  return html
}
