import { Game } from "./game.js";

function setup() {
  var canvas = document.querySelector("canvas");
  var game = new Game(canvas);
  game.clearScreen();
  game.drawLimits();
  game.drawHexes();
}

export { setup };
