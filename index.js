import TitleScene from './titleScene.js';
import config from './gameConfig.js';

class LevelOne extends Phaser.Scene {
  constructor() {
      super(LevelOne);
      
  }

  preload () {
      this.load.image('background', 'assets/images/backG.jpg');
      this.load.spritesheet('robot', 'assets/images/png/idle.png', { frameWidth: 275, frameHeight: 473 }) 
      this.load.spritesheet('robotrun', 'assets/images/png/run.png', { frameHeight: 489,  frameWidth: 310})
      this.load.spritesheet('robotjump', 'assets/images/png/jump.png', { frameHeight: 476, frameWidth: 351})
      this.load.image('zombie1', 'assets/images/png-files/female-zombie/Attack (1).png')
      this.load.image('zombie2', 'assets/images/png-files/male-zombie/Attack (1).png')
      this.load.image('clouds', 'assets/images/clouds.png')
      this.load.image('floor', 'assets/images/grass.png')
      this.load.audio('LevelOneMusic', 'assets/audio/Patricia Taxxon - Nostalgia - 09 Home.mp3')
  }

  create () {
      // access canvas width & height from config object
      let gameWidth = this.sys.game.config.width;
      let gameHeight = this.sys.game.config.height;
      console.log(gameHeight, gameWidth) 

      this.LevelOneMusic = this.sound.add('LevelOneMusic')
      this.LevelOneMusic.play();
      this.backG = this.add.sprite(0, 0, 'background');    // adds background

      this.player = this.physics.add.sprite(gameWidth/2, 0);  // adds player & stores in variable
      this.player.setGravityY(200)

      this.zombie1 = this.add.sprite(800, 395, 'zombie1'); // adds enemy
      this.zombie2 = this.add.sprite(900, 405, 'zombie2'); // adds enemy
      // let zombie1 = this.add.sprite(800, 395, 'zombie1'); 
      let clouds = this.add.sprite(500,95, 'clouds');  

      let floor = this.physics.add.sprite(gameWidth/2, gameHeight * .95, 'floor');
      this.physics.add.collider(this.player, floor)
      floor.setImmovable()

      console.log(this.input.keyboard)
      // decreases the size of the sprites

      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('robot', { start: 0, end: 8}),
        frameRate: 8,
        repeat: -1
    });

      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('robotrun', { start: 0, end: 7}),
        frameRate: 8,
        repeat: -1
      })

      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('robotjump', { start: 0, end: 9}),
        frameRate: 8,
        repeat: -1
      })

      this.player.setScale(0.3) 
      this.zombie1.setScale(0.3)
      this.zombie2.setScale(0.3)
      floor.setScale(2,1)
      clouds.setScale(.8,1.3)
  
      this.zombie1.flipX = true; // flips the zombie from right to left
      this.zombie2.flipX = true;
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
    
    
  }


  update () { // updates 60 times per second
      this.zombie1.x -= 2;
      this.zombie2.x -= 1;

      let score = 0;
      this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: 'black'})

      this.add.text(200, 0, 'AndroCat Adventures', {fontSize: '15px', fill: 'black'})

      if (this.arrowUp.isDown || this.w.isDown) {

        this.player.y -= 15
        this.player.play('jump', true)
          // this.player.y -= 2   
        } else if (this.arrowDown.isDown || this.s.isDown) {

          // this.player.y += 2
        } else if (this.arrowLeft.isDown || this.a.isDown) {

          this.player.x -= 2
        } else if (this.arrowRight.isDown || this.d.isDown) {

          this.player.x += 2
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