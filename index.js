import TitleScene from './titleScene.js';
import config from './gameConfig.js';

class LevelOne extends Phaser.Scene {
  constructor() {
      super(LevelOne);
  }

  preload () {   //loads assets before scene starts
      // this.load.image('background', 'assets/images/starry.png');
      this.load.spritesheet('robot', 'assets/images/png/idle.png', { frameWidth: 275, frameHeight: 473 }) 
      this.load.spritesheet('robotrun', 'assets/images/png/run.png', { frameHeight: 480,  frameWidth: 300})
      this.load.spritesheet('robotjump', 'assets/images/png/jump.png', { frameHeight: 476, frameWidth: 351})
      this.load.spritesheet('roboslide', 'assets/images/png/slide.png', { frameHeight: 200,frameWidth: 300})
      this.load.image('zombie1', 'assets/images/png-files/female-zombie/Attack (1).png')
      this.load.image('zombie2', 'assets/images/png-files/male-zombie/Attack (1).png')
      this.load.image('clouds', 'assets/images/clouds.png')
      this.load.image('floor', 'assets/images/grass.png')
      // this.load.image('gameOver', 'assets/images/gameover.png')
      this.load.audio('LevelOneMusic', 'assets/audio/Patricia Taxxon - Nostalgia - 09 Home.mp3')
  }

  create () {
      // access canvas width & height from config object
      let gameWidth = this.sys.game.config.width;
      let gameHeight = this.sys.game.config.height;
      console.log(gameHeight, gameWidth) 

      this.LevelOneMusic = this.sound.add('LevelOneMusic')
      this.LevelOneMusic.play();

      // this.backG = this.add.sprite(50, 20, 'background').setOrigin(0, 0);    // adds background

      let floor = this.physics.add.staticImage(gameWidth/2, gameHeight * .95, 'floor').setScale(2).refreshBody();

      this.player = this.physics.add.sprite(0, 300, 'player');  // adds player & stores in variable
      this.player.setGravityY(400)

      this.physics.add.collider(this.player, floor)
      floor.setImmovable()

      this.zombie1 = this.physics.add.sprite(800, 395, 'zombie1'); // adds enemy
      this.zombie2 = this.physics.add.sprite(900, 405, 'zombie2'); // adds enemy
      this.zombie3 = this.physics.add.sprite(2000, 395, 'zombie1');
      this.zombie4 = this.physics.add.sprite(2500, 405, 'zombie2');
      // let zombie1 = this.add.sprite(800, 395, 'zombie1'); 
      let clouds = this.add.sprite(500,95, 'clouds');  


      // let end = this.add.sprite(400, 200, 'gameover')

      // console.log(this.input.keyboard)
      // decreases the size of the sprites

      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 8}),
        frameRate: 5,
        repeat: -1
    });

      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('robotrun', { start: 0, end: 3}),
        frameRate: 8,
        repeat: -1
      })

      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('robotjump', { start: 0, end: 9}),
        frameRate: 8,
        repeat: -1
      })

      this.anims.create({
        key: 'slide',
        frames: this.anims.generateFrameNumbers('roboslide', {start: 0, end: 9}),
        frameRate: 3,
        repeat: -1
      })

      this.player.setScale(0.3) 
      this.zombie1.setScale(0.3)
      this.zombie2.setScale(0.3)
      this.zombie3.setScale(0.3)
      this.zombie4.setScale(0.3)
      floor.setScale(2,1)
      clouds.setScale(.8,1.3)

  
      this.zombie1.flipX = true; // flips the zombie from right to left
      this.zombie2.flipX = true;
      this.zombie3.flipX = true;
      this.zombie4.flipX = true;
      // player.setPosition(1000/2, 550/2)      // places player in the center of canvas

  
      console.log(this.backG) // sprite properties displayed
      console.log(this) // properties available to the game scene 
    // keyboard events
    this.arrowUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.arrowDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.arrowLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.arrowRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // Handling collision
  this.player.setCircle(10, 300, 100)   // sets the point of collision -> uses circle instead of default square
                  // 1st argument sets the size of the circle
                  // 2nd argument X-axis sets how far from origin(0,0) of player (origin is at top left corner)
                  // 3rd argument Y-axis
   
   this.add.text(400, 0, 'AndroCat Adventures', {fontSize: '15px', fill: 'black'})

   let score = 5;
   let scoreText =  this.add.text(400, 16, 'Lives: 5', {fontSize: '32px', fill: 'black'})
   scoreText.visible = true;

   let gameOverText =  this.add.text(500, 300, 'GAME OVER', {fontSize: '60px', fill: 'red'})
    gameOverText.setOrigin(0.5)  
    gameOverText.visible = false;

    // let end = this.add.sprite(400, 200, 'gameover')
    // gameOver.visible = false;

    this.physics.add.collider(this.zombie1, this.player, function(zombie, player){
        zombie.destroy();     // upon collision zombie disappears
        score -= 1
        scoreText.setText('Lives: ' + score)

        if (score === 2){
          gameOverText.visible = true;
          scoreText.visible = false;
          // this.scene.pause(LevelOne)
          player.visible = false
        }
    })
    this.physics.add.collider(this.zombie2, this.player, function(zombie, player){
      score -= 1
      scoreText.setText('Lives: ' + score)
      zombie.destroy(); // upon collision zombie disappears

      if (score === 2){
       gameOverText.visible = true;
       scoreText.visible = false;
      //  this.scene.pause(LevelOne)
        player.visible = false
      }
    })
    this.physics.add.collider(this.zombie3, this.player, function(zombie, player){
      score -= 1
      scoreText.setText('Lives: ' + score)
      zombie.destroy(); // upon collision zombie disappears

      if (score === 2){
       gameOverText.visible = true;
       scoreText.visible = false;
      //  this.scene.pause(LevelOne)
        player.visible = false
      }
    })
    this.physics.add.collider(this.zombie4, this.player, function(zombie, player){
      score -= 1
      scoreText.setText('Lives: ' + score)
      zombie.destroy(); // upon collision zombie disappears

      if (score === 2){
       gameOverText.visible = true;
       scoreText.visible = false;
      //  this.scene.pause(LevelOne)
        player.visible = false
      }
    })

    this.player.play('idle')

    // setting player boundary with edge of canvas
    this.physics.world.setBounds(60, 0, gameWidth - 100, gameHeight, true, true, true, true);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', function(){
        if(this.player.x > 700 && !(this.player.flipX)) {
          this.player.flipX = true;
          this.player.x = 950;
        } else if (this.player.x < 100 && this.player.flipX) {
          this.player.flipX = false;
          this.player.x = 50;
        }

    },this);

  }


  update () { // updates 60 times per second
      this.zombie1.x -= 4;
      this.zombie2.x -= 3;
      this.zombie3.x -= 4
      this.zombie4.x -= 3

      if (this.arrowUp.isDown || this.w.isDown) {

        this.player.y -= 15
        this.player.play('jump', true)
          // this.player.y -= 2   
        // } else if (this.arrowDown.isDown || this.s.isDown) {

        //   this.player.x += 10
        //   this.player.play('slide')

        // } else if (this.arrowDown.isDown && this.arrowLeft.isDown){
        //   this.player.x -=10
        //   this.player.play('slide')

        } else if (this.arrowLeft.isDown || this.a.isDown) {
          if (!(this.player.flipX)) {
            this.player.flipX = true;
          }
          this.player.play('run', true)
          this.player.x -= 7
        } else if (this.arrowRight.isDown || this.d.isDown) {
          if (this.player.flipX) {
            this.player.flipX = false;
          }
          this.player.x += 7
          this.player.play('run', true)
        }
        else {
          this.player.play('idle', true)
        }
  }
} 


let game = new Phaser.Game(config);  // starts the game utializing the config object
game.scene.add('TitleScene', TitleScene);
game.scene.add("LevelOne", LevelOne);


// Start the title scene
game.scene.start('TitleScene');
// game.scene.start('LevelOne');