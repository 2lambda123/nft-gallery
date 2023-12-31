import AFRAME from 'aframe'

// A sample component from the A-Frame documentation
AFRAME.registerComponent('change-color-on-hover', {
  schema: {
    color: { default: 'red' }
  },

  init: function() {
    let data = this.data
    let el = this.el
    let defaultColor = el.getAttribute('material').color

    el.addEventListener('mouseenter', function() {
      el.setAttribute('color', data.color)
    })

    el.addEventListener('mouseleave', function() {
      el.setAttribute('color', defaultColor)
    })
  }
})

// Used to scale the buttons on the control panel when hovering over them with a mouse or laser pointer
AFRAME.registerComponent('control-button-hover', {
  init: function() {
    let el = this.el

    el.addEventListener('mouseenter', function() {
      el.setAttribute('scale', '1.1 1.1 1.1')
    })

    el.addEventListener('mouseleave', function() {
      el.setAttribute('scale', '1 1 1')
    })
  }
})
