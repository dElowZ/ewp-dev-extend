export default class EwpDevExtend {
  constructor (ewpHelper) {
    // Header
    this.enableHeader = ewpHelper.enableHeader || false
    this.headerSelector = ewpHelper.headerSelector || false
    this.headerScrolledClass = ewpHelper.headerScrolledClass || false
    this.addClassAfterScrollPos = ewpHelper.addClassAfterScrollPos || false
    this.hideHeaderOnScroll = ewpHelper.hideHeaderOnScroll || false
    this.hideHeaderAfter = ewpHelper.hideHeaderAfter || false
    this.hideHeaderBreakpoint = ewpHelper.hideHeaderBreakpoint
    // Footer
    this.enableFooter = ewpHelper.enableFooter || false
    this.footerSelector = ewpHelper.footerSelector || false
    // Other options
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
      body.style.minHeight = 100 + '%'
      body.style.position = 'relative'
    }

    // Others
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
    element.setAttribute(
      'style', 'position:absolute;left:0;bottom:0;width:100%;'
    )
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
    let body = document.body
    body.style.overflowX = 'hidden'
    element.setAttribute(
      'style', 'position:fixed;width:100%;top:0;left:0;z-index:100;transition:all .3s;'
    )
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
    let hideAfterPx = ''
    if (hideHeaderAfter) {
      hideAfterPx = hideHeaderAfter
    } else {
      hideAfterPx = 0
    }
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > hideAfterPx) {
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
