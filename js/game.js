import {Cube} from './cube.js'
import {Hex} from './hex.js'

const SIZE = 48

class Game {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height
    this.setupControls()
    this.hexes = [
      new Hex(0, 0),
      new Hex(1, 0),
      new Hex(0, 1),
      new Hex(-1, 1),
      new Hex(-1, 0),
      new Hex(0, -1),
      new Hex(1, -1)
    ]
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
  drawCrossChair (x, y) {
    this.ctx.strokeStyle = 'white'
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.moveTo(x, y - 5)
    this.ctx.lineTo(x, y + 5)
    this.ctx.moveTo(x - 5, y)
    this.ctx.lineTo(x + 5, y)
    this.ctx.closePath()
    this.ctx.stroke()
  }
  handleClick (x, y) {
    this.drawCrossChair(x, y)
    let tx = x - this.width / 2
    let ty = y - this.height / 2
    let hex = this.hexRound(this.pixelToHex(tx, ty, SIZE))
    console.log(hex)
    let phex = this.hexToPixel(hex, SIZE)
    console.log(phex)
    this.drawHex(phex.x, phex.y, SIZE)
  }
  cubeToAxial (cube) {
    var q = cube.x
    var r = cube.z
    return new Hex(q, r)
  }

  axialToCube (hex) {
    var x = hex.q
    var z = hex.r
    var y = -x - z
    return new Cube(x, y, z)
  }

  cubeToOddr (cube) {
    var col = cube.x + (cube.z - (cube.z & 1)) / 2
    var row = cube.z
    return new Hex(col, row)
  }

  oddrToCube (hex) {
    var x = hex.col - (hex.row - (hex.row & 1)) / 2
    var z = hex.row
    var y = -x - z
    return new Cube(x, y, z)
  }

  getHexesAsCubes () {
    var cubes = []
    for (var hex of this.hexes) {
      cubes.push(this.axialToCube(hex))
    }
    return cubes
  }

  drawHexes () {
    let cubes = this.getHexesAsPoints()
    this.ctx.save()
    this.ctx.translate(this.width / 2, this.height / 2)
    for (let c of cubes) {
      console.log(c)
      this.drawCrossChair(c.x, c.y)
    }
    this.ctx.restore()
  }

  hexToPixel (hex, size) {
    let x = size * Math.sqrt(3) * (hex.q + hex.r / 2)
    let y = size * 3 / 2 * hex.r
    return {x, y}
  }

  pixelToHex (x, y, size) {
    let q = (x * Math.sqrt(3) / 3 - y / 3) / size
    let r = y * 2 / 3 / size
  //  return hex_round(Hex(q, r))
    return new Hex(q, r)
  }
  getHexesAsPoints () {
    var points = []
    for (var hex of this.hexes) {
      points.push(this.hexToPixel(hex, SIZE))
    }
    return points
  }

  cubeRound (cube) {
    var rx = Math.round(cube.x)
    var ry = Math.round(cube.y)
    var rz = Math.round(cube.z)

    var xDiff = Math.abs(rx - cube.x)
    var yDiff = Math.abs(ry - cube.y)
    var zDiff = Math.abs(rz - cube.z)

    if (xDiff > yDiff && xDiff > zDiff) {
      rx = -ry - rz
    } else if (yDiff > zDiff) {
      ry = -rx - rz
    } else {
      rz = -rx - ry
    }
    return new Cube(rx, ry, rz)
  }

  hexRound (hex) {
    return this.cubeToAxial(this.cubeRound(this.axialToCube(hex)))
  }

  drawHex (x, y, size) {
    this.ctx.save()
    this.ctx.translate(this.width / 2, this.height / 2)
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
    this.ctx.beginPath()
    for (var i = 0; i < 6; i++) {
      let angleDeg = 60 * i + 30
      let angleRad = Math.PI / 180 * angleDeg
      let px = x + size * Math.cos(angleRad)
      let py = y + size * Math.sin(angleRad)
      if (i === 0) {
        this.ctx.moveTo(px, py)
      } else {
        this.ctx.lineTo(px, py)
      }
    }
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.restore()
  }
}
export {Game}
