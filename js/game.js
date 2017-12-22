export {Game}

class Game {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.setupControls()
  }

  clearScreen () {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  setupControls () {
    var that = this
    window.addEventListener('keydown', function (e) {
      console.log(e.keyCode)
    })
    window.addEventListener('keyup', function (e) {
      console.log(e.keyCode)
    })
    window.addEventListener('click', function (e) {
      var element = that.canvas
      var offsetX = 0
      var offsetY = 0

      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft
          offsetY += element.offsetTop
        } while ((element = element.offsetParent))
      }
      var x = e.pageX - offsetX
      var y = e.pageY - offsetY
      console.log('click', e.pageX, e.pageY)
      console.log('offset', x, y)
      that.handleClick(x, y)
    }, false)
  }
  handleClick (x, y) {
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.moveTo(x, y - 10)
    this.ctx.lineTo(x, y + 10)
    this.ctx.moveTo(x - 10, y)
    this.ctx.lineTo(x + 10, y)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.beginPath()
    this.ctx.fillStyle = 'white'
    this.ctx.rect(x - 5, y - 5, 10, 10)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
