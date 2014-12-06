require('./style.scss')

document.title = 'Winning the Internet with Browserify'

var imgSlide = require('./image-slide')

var slides =
  [ require('./slides/preload')
  , require('./slides/title')

  , require('./slides/perfect-loops/1')
  , require('./slides/perfect-loops/2')
  , require('./slides/perfect-loops/3')
  , require('./slides/perfect-loops/4')

  , require('./slides/block-wave/0')
  , require('./slides/block-wave/cheap-trick-1')
  , require('./slides/block-wave/1')
  , require('./slides/block-wave/2')
  , require('./slides/block-wave/easing')
  , require('./slides/block-wave/3')
  , require('./slides/block-wave/4')
  , require('./slides/block-wave/isomer')
  , require('./slides/block-wave/4')
  , require('./slides/block-wave/5')
  , require('./slides/block-wave/6')
  , require('./slides/block-wave/color')
  , require('./slides/block-wave/6')
  , require('./slides/block-wave/7')
  , require('./slides/block-wave/gif')
  , require('./slides/block-wave/8')

  , require('./slides/block-twist/cheap-trick-wave')
  , require('./slides/block-twist/loading-wave')
  , require('./slides/block-twist/1')
  , require('./slides/block-twist/2')

  , require('./slides/block-terrain/cheap-trick-perlin')
  , require('./slides/block-terrain/1')
  , require('./slides/block-terrain/comment')

  , require('./slides/text-3d/1')
  ]

window.addEventListener('hashchange', onHashChange)
window.addEventListener('keyup', onKeyup)

if (window.location.hash === '') {
  window.location.hash = '/1'
} else {
  onHashChange()
}

function nextSlide () {
  var slideNumber = getCurrentSlideNumber()
  if (slideNumber > slides.length - 1) slideNumber = slides.length - 1
  window.location.hash = '/' + (slideNumber + 1)
}

function prevSlide () {
  var slideNumber = getCurrentSlideNumber()
  if (slideNumber < 2) slideNumber = 2
  window.location.hash = '/' + (slideNumber - 1)
}

function onHashChange (evt) {
  var slideNumber = getCurrentSlideNumber()
  changeSlide(slideNumber)
}

function changeSlide (n) {
  if (slides[n-1]) {
    slides[n-1](document.body)
  }
}

function getCurrentSlideNumber () {
  var slideNumberStr = window.location.hash.replace(/^#\/?/, '')
  var slideNumber = parseFloat(slideNumberStr)
  return isFinite(slideNumber) ? slideNumber : 0
}

function onKeyup (evt) {
  if (evt.keyIdentifier === 'Right') return nextSlide()
  if (evt.keyIdentifier === 'Left') return prevSlide()
}
