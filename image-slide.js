var h = require('hyperscript')

module.exports = function(url) {
  return function(el) {
    el.innerHTML = ''
    var slide = render(url)
    el.appendChild(slide)
  }
}

function render (url) {
  return h('.full-img',
    {
      style: {
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px',
        background: 'url('+url+') no-repeat center center fixed',
        'background-size': 'cover'
      }
    }
  )
}
