require('./style.scss')

var imgSlide = require('./image-slide')

var slides =
  [ require('./slides/preload')
  , require('./slides/title')
  , imgSlide('/images/brainpod-1.jpg')
  , imgSlide('/images/brainpod-2.jpg')
  , imgSlide('/images/glow-1.jpg')
  , imgSlide('/images/glow-2.jpg')
  , imgSlide('/images/yoyo.jpg')
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
