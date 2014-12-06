var Wave = require('loading-wave')

module.exports = function(el) {
  el.innerHTML = ''

  var height = 200

  var wave = Wave({
    width: height,
    height: height,
    n: 12,
    color: '#F27300'
  })

  var rect = wave.el.getBoundingClientRect()
  wave.el.style.margin = '0 auto'
  wave.el.style.marginTop = (window.innerHeight - height)/2 + 'px'

  el.appendChild(wave.el)

  function check () {
    if (!wave.el.parentNode) {
      wave.stop()
    } else {
      setTimeout(check, 1000)
    }
  }
  check()
}
