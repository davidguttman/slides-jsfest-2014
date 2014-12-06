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
      src: '/images/t3d-code.png',
      height: window.innerHeight/2}),
    h('h1', 'npm i -S text-3d-particles'))

  return html
}
