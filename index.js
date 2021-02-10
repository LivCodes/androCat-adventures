document.addEventListener("DOMContentLoaded", function () {
  let x = 0;
  let y = 400;
  let key;
  let isMoving = false;
  const canvas = document.getElementById("gameScreen");
  const ctx = canvas.getContext("2d");
  canvas.style.border = "5px solid black"
  let player = new Image();

  player.addEventListener("load", draw)

  player.src = "png-files-right/Idle1.png";
  let player1 = new Image();
  player1.src = "png-files-right/dead1.png";


  document.addEventListener("keydown", (e) => {
    isMoving = true;
    key = e.keyCode;
  })

  document.addEventListener("keyup", (e) => {
      isMoving = false;
      key=window.event?e.keyCode:e.which;
  })
  setInterval(move,20);

  function draw() {
      return ctx.drawImage(player,x,y,150,150);
  }
  idle = [player1, player, player1, player]
  function move() {
      if(isMoving == false){
          return;
      }
      if(key == 37 || key == 65 ){
          x -= 2;
      }
      if(key== 38 || key == 87){
          y -= 2;
      }
      if(key== 39 || key == 68){
          x += 2;
      }
      if(key == 40 || key == 83){
          y += 2;
      }
      canvas.width=canvas.width;
      ctx.drawImage(player,x,y,150,150);
      
  }

})

