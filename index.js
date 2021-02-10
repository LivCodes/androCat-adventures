 document.addEventListener("DOMContentLoaded", () => {
    // document.body.style.backgroundColor = "#081c15"
    // let canvas = document.getElementById("gameScreen")
    // let context = canvas.getContext("2d")
    // context.fillRect(50, 700, 50, 50)
    // function draw() {
        var canvas = document.getElementById("gameScreen");
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
        }

        img1 = new Image();   
        img1.addEventListener('load', function() {
            ctx.drawImage(img1,850,400,150,150)
            
          }, false);
        
        img1.src = "png-files-right/Idle1.png"
        
        
        canvas.addEventListener("keydown", function(event) {
            console.log(event.key)
            if (event.keyCode ===  40 || event.keyCode === 83) { //charcter ducks? slides?
            console.log("can't sl ide yet!")
          //       if (img1.style.top !== "0px") {
          //         img1.style.top = `${parseInt(img1.style.top) + 10}px`
          clearCanvas();
          y = y - 10;
          ctx.drawImage(img1,x,y)
                 
            } else if (event.keyCode === 38 || event.keyCode === 87) { //will be jumping
            jump()
            } else if (event.keyCode === 39 || event.keyCode === 68) { // move right
            movingRight()
            } else if (event.keyCode === 37 || event.keyCode === 65) { // move left
            movingLeft()
            }
          }, true);
          
          
          let isJumping = false;
          let isGoingRight = false;
          let isGoingLeft = false;
          let bottom = 0;
          let gravity = 0.9;
          let leftTimerId
          let rightTimerId

          function jump(){
            if (isJumping) return
            img1.remove('characterSliding');
            let upTimerId = setInterval(function () {
              if (bottom > 250) {
                clearInterval(upTimerId)
                let downTimerId = setInterval( function () {
                  if (bottom < 0) {
                    clearInterval(downTimerId)
                    isJumping = false;
                  }
                  bottom -= 5;
                  bottom = bottom * gravity;
                  img1.style.bottom = bottom + "px"
                }, 20)
              } 
              isJumping = true
              bottom += 30;
              bottom = bottom * gravity
              img1.style.bottom = bottom + "px";
            }, 20)
          }

          function movingLeft() {
            if (isGoingRight) {
              clearInterval(rightTimerId);
              isGoingRight = false;
            }
            isGoingLeft = true;
            leftTimerId = setInterval(function () {
              left -= 5;
              img1.style.left = left = "px";
            },20)
          }

          function movingRight() {
            if(isGoingLeft) 
            {
              clearInterval(leftTimerId);
              isGoingLeft = false;
            }
            isGoingRight = true;
            rightTimerId = setInterval(function () {
              left += 5;
              img1.style.left = left + "px"
            }, 20)
          }

          






        /******************************************************** */
        

        const backgroundImg = new Image();
        backgroundImg.src = "./header_clouds.png"

        backgroundImg.addEventListener("load", function background() {
            ctx.drawImage(backgroundImg,0,0, 1000, 550)
        });
      

          var CanvasXSize = 1000;
          var CanvasYSize = 200;
          var speed = 10; // lower is faster
          var scale = 1.05;
          var y = -4.5; // vertical offset
          
          // Main program
          
          var dx = 0.75;
          var imgW;
          var imgH;
          var x = 0;
          var clearX;
          var clearY;
          var ctx;
          
          backgroundImg.onload = function() {
              imgW = backgroundImg.width * scale;
              imgH = backgroundImg.height * scale;
          
              if (imgW > CanvasXSize) {
                  // image larger than canvas
                  x = CanvasXSize + imgW;
              }
              if (imgW > CanvasXSize) {
                  // image width larger than canvas
                  clearX = imgW;
              } else {
                  clearX = CanvasXSize;
              }
              if (imgH > CanvasYSize) {
                  // image height larger than canvas
                  clearY = imgH;
              } else {
                  clearY = CanvasYSize;
              }
          
              // get canvas context
              ctx = document.getElementById('gameScreen').getContext('2d');
          
              // set refresh rate
              return setInterval(draw, speed);
          }
          
          function draw() {
              // ctx.clearRect(0, 0, clearX, clearY); // clear the canvas
          
              // if image is <= Canvas Size
              if (imgW <= CanvasXSize) {
                  // reset, start from beginning
                  if (x > CanvasXSize) {
                      x = -imgW + x;
                  }
                  // draw additional image1
                  if (x > 0) {
                      ctx.drawImage(backgroundImg, -imgW + x, y, imgW, imgH);
                  }
                  // draw additional image2
                  if (x - imgW > 0) {
                      ctx.drawImage(backgroundImg, -imgW * 2 + x, y, imgW, imgH);
                  }
              }
          
              // image is > Canvas Size
              else {
                  // reset, start from beginning
                  if (x > (CanvasXSize)) {
                      x = CanvasXSize - imgW;
                  }
                  // draw additional image
                  if (x > (CanvasXSize-imgW)) {
                      ctx.drawImage(backgroundImg, x - imgW + 1, y, imgW, imgH);
                  }
              }
              // draw image
              ctx.drawImage(backgroundImg, x, y,imgW, imgH);
              // amount to move
              x += dx;
          }
          

// *************************************************************************
    //   }
//     document.addEventListener("")

// let canvas = document.getElementById("gameScreen");
// let canvasCtx = canvas.getContext('2d')
// // canvas.style.height = "100px"
// // canvas.style.width = "100px"

// const robotSprite = {}
// robotSprite.player = new Image()
// robotSprite.player.src = "Development/unit-5/androCat-adventures/pngFolder/Idle-1.png";
// //debugger
// console.log(robotSprite)

// let playerHeight = '96.666px'
// let playerWidth = '89.333px'
// let playerFrameX = 0
// let playerFrameY = 0
// let spriteX = 0
// let spriteY = 0

// function drawSprite(img, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationH, destinationW){
//     canvasCtx.drawImage(img, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationH, destinationW)
//     console.log('good to go')
// }

// function animation(){
//     canvasCtx.clearRect(0,0, canvas.width, canvas.height)
//     debugger
//     drawSprite(robotSprite.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, 
//         playerHeight, spriteX, spriteY, playerWidth, playerHeight)
//         if (playerFrameX < 6){
//             playerFrameX++
//         }
//         else {
//             playerFrameX = 0
//         }
// }

// setInterval(animation, 1000);

// // robot sprite
// // 804 x 580
// // 9 columns   width = 804 % 9 89.333
// // 6 rows      height = 580 % 96.666
// let canvas = document.getElementById("gameScreen");
// let canvasCtx = canvas.getContext('2d')
// // canvas.style.height = "100px"
// // canvas.style.width = "100px"

// const robotSprite = {}
// robotSprite.player = new Image()
// robotSprite.player.src = "./robo-sprite.png";
// const moves = ['up', 'down', 'left', 'right'];

// let playerHeight = 118.333
// let playerWidth = 80
// let playerFrameX = 0
// let playerFrameY = 0
// let spriteX = 0
// let spriteY = 0
// let speed = 0

// function drawSprite(img, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationH, destinationW){
//     canvasCtx.drawImage(img, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationH, destinationW)
//     console.log('good to go')
// }

// function animation(){
//     canvasCtx.clearRect(0,0, canvas.width, canvas.height)
//     // debugger
//     drawSprite(robotSprite.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, 
//         playerHeight, spriteX, spriteY, playerWidth, playerHeight)
//         if (playerFrameX < 9){
//             playerFrameX++
//         }
//         else {
//             playerFrameX = 3
//         }

//         if (spriteX < canvas.width + playerWidth) {
//             spriteX += speed
//         }
//         else {
//             spriteX = 0 - playerWidth;
//         }
// }

// setInterval(animation, 1000/30);

// robot sprite
// 804 x 580
// 9 columns   width = 804 % 9 89.333
// 6 rows      height = 580 % 96.666

// fox sprite
// 800 x 355
// 10 cols       width = 800 % 10
// 3 rows      height= 111 % 3

});
