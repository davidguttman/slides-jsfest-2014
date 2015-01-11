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
      src: 'http://i.imgur.com/ofsyUMp.gif',
      height: window.innerHeight/2,
      style:{background: 'white'}}),
    h('h1.cli', 'npm i -S gif.jsify'))

  return html
}
