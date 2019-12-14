export default class EwpDevExtend {
  constructor (ewpHelper) {
    this.enableHeader = ewpHelper.enableHeader || false
    this.headerSelector = ewpHelper.headerSelector || false
    this.headerScrolledClass = ewpHelper.headerScrolledClass || false
    this.addClassAfterScrollPos = ewpHelper.addClassAfterScrollPos || false
    this.hideHeaderOnScroll = ewpHelper.hideHeaderOnScroll || false
    this.hideHeaderAfter = ewpHelper.hideHeaderAfter || false
    this.hideHeaderBreakpoint = ewpHelper.hideHeaderBreakpoint
    this.enableFooter = ewpHelper.enableFooter || false
    this.footerSelector = ewpHelper.footerSelector || false
    this.run()
  }
  run () {
    // Header

    if (this.enableHeader === true) {
      let paramHeader = ''
      let paramHeaderScrollClass = ''
      if (this.headerSelector !== false) {
        paramHeader = this.headerSelector
      } else {
        paramHeader = document.querySelector('header')
      }

      this.getHeaderHeight(paramHeader)
      this.styleHeader(paramHeader)
      if (this.hideHeaderOnScroll) {
        if (this.hideHeaderAfter) {
          this.hideHeader(paramHeader, this.hideHeaderAfter)
        } else {
          this.hideHeader(paramHeader)
        }
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

    // Footer

    if (this.enableFooter) {
      let paramFooter = ''
      if (this.footerSelector !== false) {
        paramFooter = this.footerSelector
      } else {
        paramFooter = document.querySelector('footer')
      }
      this.getFooterHeight(paramFooter)
      let html = document.querySelector('html')
      let body = document.body
      html.style.height = 100 + '%'
      body.style.height = 100 + '%'
      body.style.position = 'relative'
    }
  }

  // helper functions ------------

  // Multiple addeventlisteners

  addListenerMulti (element, eventNames, listener) {
    var events = eventNames.split(' ')
    for (var i = 0, iLen = events.length; i < iLen; i++) {
      element.addEventListener(events[i], listener, false)
    }
  }

  // Get footer height dynamically

  getFooterHeight (element) {
    if (!element) {
      return
    }
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

  // Style header for fixed position

  styleHeader (element) {
    if (!element) {
      return
    }
    element.style.position = 'fixed'
    element.style.width = 100 + '%'
    element.style.top = 0
    element.style.zIndex = 100
    element.style.transition = 'all .3s'
  }
  // Get header height dynamically

  getHeaderHeight (element) {
    if (!element) {
      return
    }

    let elementHeight = element.offsetHeight
    document.body.style.paddingTop = elementHeight + 'px'
    this.addListenerMulti(window, 'resize scroll', () => {
      let elementHeight = element.offsetHeight
      document.body.style.paddingTop = elementHeight + 'px'
    })
  }

  // Hide header on scroll
  hideHeader (element, hideHeaderAfter) {
    let prevScrollpos = window.pageYOffset
    let height = element.offsetHeight
    window.addEventListener('scroll', () => {
      if (hideHeaderAfter) {
        if (window.pageYOffset > hideHeaderAfter) {
          height = element.offsetHeight
          let currentScrollPos = window.pageYOffset
          if (prevScrollpos > currentScrollPos) {
            element.style.top = '0'
          } else {
            element.style.top = '-' + height + 'px'
          }
          prevScrollpos = currentScrollPos
        }
      } else {
        height = element.offsetHeight
        let currentScrollPos = window.pageYOffset
        if (prevScrollpos > currentScrollPos) {
          element.style.top = '0'
        } else {
          element.style.top = '-' + height + 'px'
        }
        prevScrollpos = currentScrollPos
      }
    })
  }
}
