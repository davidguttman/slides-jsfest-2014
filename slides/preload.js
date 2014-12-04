var Pendulum = require('wave-pendulum')

module.exports = function(el) {
  el.innerHTML = ''
  pendulum = new Pendulum(
    { width: window.innerWidth
    , height: window.innerHeight
    , background: '#0E1321'
    , foreground: '#FDF3B6'
    , n: 20
    , style: 0
    }
  )
  el.appendChild(pendulum.el)
}
