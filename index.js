 document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundColor = "#001233"
    // let canvas = document.getElementById("gameScreen")
    // let context = canvas.getContext("2d")
    // context.fillRect(50, 700, 50, 50)

//     document.addEventListener("")

let canvas = document.getElementById("gameScreen");
let canvasCtx = canvas.getContext('2d')
// canvas.style.height = "100px"
// canvas.style.width = "100px"

const robotSprite = {}
robotSprite.player = new Image()
robotSprite.player.src = "./robo-sprite.png";
const moves = ['up', 'down', 'left', 'right'];

let playerHeight = 118.333
let playerWidth = 80
let playerFrameX = 0
let playerFrameY = 0
let spriteX = 0
let spriteY = 0
let speed = 0

function drawSprite(img, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationH, destinationW){
    canvasCtx.drawImage(img, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationH, destinationW)
    console.log('good to go')
}

function animation(){
    canvasCtx.clearRect(0,0, canvas.width, canvas.height)
    // debugger
    drawSprite(robotSprite.player, playerWidth * playerFrameX, playerHeight * playerFrameY, playerWidth, 
        playerHeight, spriteX, spriteY, playerWidth, playerHeight)
        if (playerFrameX < 9){
            playerFrameX++
        }
        else {
            playerFrameX = 3
        }

        if (spriteX < canvas.width + playerWidth) {
            spriteX += speed
        }
        else {
            spriteX = 0 - playerWidth;
        }
}

setInterval(animation, 1000/30);

// robot sprite
// 804 x 580
// 9 columns   width = 804 % 9 89.333
// 6 rows      height = 580 % 96.666

// fox sprite
// 800 x 355
// 10 cols       width = 800 % 10
// 3 rows      height= 111 % 3

});
