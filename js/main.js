
import {Game} from './Game.js'

function setup () {
  var canvas = document.querySelector('canvas')
  var game = new Game(canvas)
  game.clearScreen()
}

export {setup}
