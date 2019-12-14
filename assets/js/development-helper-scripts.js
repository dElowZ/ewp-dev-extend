export default class DevHelper {
  constructor (helperOptions) {
    this.enableHeader = helperOptions.enableHeader || true
    this.enableFooter = helperOptions.enableFooter || true
    this.footerSelector = helperOptions.footerSelector || false
    this.headerSelector = helperOptions.headerSelector || false
    this.headerScrolledClass = helperOptions.headerScrolledClass || false
    this.addClassAfterScrollPos = helperOptions.addClassAfterScrollPos || false
    this.run()
  }
  run () {
    if (this.enableHeader) {
      let paramHeader = ''
      let paramHeaderScrollClass = ''
      if (this.headerSelector !== false) {
        paramHeader = this.headerSelector
        this.headerHeight(paramHeader)
      } else {
        paramHeader = document.querySelector('header')
        this.headerHeight(paramHeader)
      }

      if (this.headerScrolledClass) {
        paramHeaderScrollClass = this.headerScrolledClass
      } else {
        paramHeaderScrollClass = 'header-scrolled'
      }

      if (this.addClassAfterScrollPos) {
        this.addListenerMulti(window, 'scroll', () => {
          if (window.pageYOffset > this.addClassAfterScrollPos) {
            paramHeader.classList.add(paramHeaderScrollClass)
          } else {
            paramHeader.classList.remove(paramHeaderScrollClass)
          }
        })
      }
    }
    if (this.enableFooter) {
      let paramFooter = ''
      if (this.footerSelector !== false) {
        paramFooter = this.footerSelector
      } else {
        paramFooter = document.querySelector('footer')
      }
      this.footerHeight(paramFooter)
      let html = document.querySelector('html')
      let body = document.body
      html.style.height = 100 + '%'
      body.style.height = 100 + '%'
      body.style.position = 'relative'
    }
  }
  addListenerMulti (element, eventNames, listener) {
    var events = eventNames.split(' ')
    for (var i = 0, iLen = events.length; i < iLen; i++) {
      element.addEventListener(events[i], listener, false)
    }
  }

  footerHeight (element) {
    if (element) {
      element.style.position = 'absolute'
      element.style.left = 0
      element.style.bottom = 0
      element.style.width = 100 + '%'
      let elementHeight = element.offsetHeight
      document.body.style.paddingBottom = elementHeight + 'px'
      this.addListenerMulti(window, 'resize scroll', () => {
        let elementHeight = element.offsetHeight
        document.body.style.paddingBottom = elementHeight + 'px'
      })
    }
  }

  headerHeight (element) {
    if (element) {
      element.style.position = 'fixed'
      element.style.width = 100 + '%'
      element.style.top = 0
      element.style.zIndex = 100
      let elementHeight = element.offsetHeight
      document.body.style.paddingTop = elementHeight + 'px'
      this.addListenerMulti(window, 'resize scroll', () => {
        let elementHeight = element.offsetHeight
        document.body.style.paddingTop = elementHeight + 'px'
      })
    }
  }
}
