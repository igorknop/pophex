export {setup}

function setup(){
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width, canvas.height);
}
