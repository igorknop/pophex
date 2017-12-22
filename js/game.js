export {Game}
class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.setupControls();
  }

  clearScreen(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0,0, this.width, this.height);
  }

  setupControls(){
    addEventListener('keydown', function(e){
      console.log(e.keyCode);
    });
    addEventListener('keyup', function(e){
      console.log(e.keyCode);
    });
    addEventListener('click', function(e){
      console.log('click');
      var element = this.canvas;
      var offsetX = 0, offsetY = 0

      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }
      x = e.pageX - offsetX;
      y = e.pageY - offsetY;
      console.log(x,y);
    }, false);
  }
}
