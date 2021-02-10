// document.addEventListener("DOMContentLoaded", function () {
// })
let x = document.getElementById("beat")
  x.play();
///////////////

function playGame() {
  document.body.innerHTML = '';

  var canvas = document.createElement("canvas")
  var container = document.createElement("div")
  var header = document.createElement('div')
  var title = document.createElement('h2')
  var background = document.createElement('img')
  canvas.id = "gameScreen"
  container.id = "container"
  header.id = "header"
  title.innerText = "AndroCat Adventures"
  // background.id = "backgroundImg"
  // background.src = ""
  document.body.appendChild(container)
  container.append(header, background, canvas)
  header.appendChild(title)
  var ctx = canvas.getContext("2d");
  canvas.style.border = "5px solid black"
  canvas.width = 1000
  canvas.height = 550
  let x = 0;
  let y = 300;
  let key;
  let isMoving = false;
  document.body.style.backgroundColor = "#dee6ed"

  let player = new Image();

  player.addEventListener("load", draw)

  player.src = "png-files-right/Idle1.png";
  let player1 = new Image();
  player1.src = "png-files-right/dead1.png";

  let clouds = new Image();
  clouds.addEventListener("load", () => {
    ctx.drawImage(clouds,0,0,1000,150);
  })
  clouds.src = "png-files-right/header_clouds.png"

  let floor = new Image();
  floor.addEventListener("load", () => {
    ctx.drawImage(floor,-70,400,1200,300);
  })
  floor.src = "https://img.pngio.com/maplestory-grass-tile-by-per-ankh-on-deviantart-grass-sprite-png-800_147.png"

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
      if(key == 37 || key == 65 && x > canvas.width){   // left
          x -= 2;
      }
      if(key== 38 || key == 87){  // up
          y -= 20;
          x += 40;
          console.log(y)
          if(y <= 250){
            y = 330
          }
      }
      if(key== 39 || key == 68){ // right
          x += 2;
      }
      if(key == 40 || key == 83){ // down
          y += 2;
      }
      canvas.width=canvas.width;
      ctx.drawImage(player,x,y,150,150);
      ctx.drawImage(clouds,0,0,1000,150);
      ctx.drawImage(floor,-70,400,1200,300);
  }
}
// })