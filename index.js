import TitleScene from './titleScene.js';
import config from './gameConfig.js';

class LevelOne extends Phaser.Scene {
  constructor() {
      super(LevelOne);
      
  }

  preload () {   //loads assets before scene starts
      this.load.image('background', 'assets/images/backG.jpg');
      this.load.image('AndroCat', 'assets/images/png/Idle (1).png')
      this.load.image('zombie1', 'assets/images/png-files/female-zombie/Attack (1).png')
      this.load.image('zombie2', 'assets/images/png-files/male-zombie/Attack (1).png')
      this.load.image('clouds', 'assets/images/clouds.png')
      this.load.image('floor', 'assets/images/grass.png')
      this.load.audio('LevelOneMusic', 'assets/audio/Patricia Taxxon - Nostalgia - 09 Home.mp3')
  }

  create () {   // add assets to the scene
      this.LevelOneMusic = this.sound.add('LevelOneMusic')
      this.LevelOneMusic.play();
      this.backG = this.add.sprite(0, 0, 'background');    // adds background
      this.player = this.physics.add.sprite(50, 405, 'AndroCat');  // adds player & stores in variable
      this.zombie1 = this.physics.add.sprite(800, 395, 'zombie1'); // adds enemy
      this.zombie2 = this.physics.add.sprite(900, 405, 'zombie2'); // adds enemy
      // let zombie1 = this.add.sprite(800, 395, 'zombie1'); 
      let clouds = this.add.sprite(500,95, 'clouds');     
      let floor = this.add.sprite(400, 530, 'floor')
      console.log(this.input.keyboard)
      // decreases the size of the sprites
      this.player.setScale(0.3) 
      this.zombie1.setScale(0.3)
      this.zombie2.setScale(0.3)
      floor.setScale(2,1)
      clouds.setScale(.8,1.3)
  
      this.zombie1.flipX = true; // flips the zombie from right to left
      this.zombie2.flipX = true;
      // player.setPosition(1000/2, 550/2)      // places player in the center of canvas
  
      // access canvas width & height from config object
      let gameWidth = this.sys.game.config.width;
      let gameHeight = this.sys.game.config.height;
      console.log(gameHeight, gameWidth) 
  
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

    this.physics.add.collider(this.zombie1, this.player, function(zombie, player){
        zombie.destroy();     // upon collision zombie disappears
    })
    this.physics.add.collider(this.zombie2, this.player, function(zombie, player){
      zombie.destroy(); // upon collision zombie disappears
    })

    // setting player boundary with edge of canvas
    this.physics.world.setBounds(60, 0, gameWidth - 100, gameHeight, true, true, true, true);

    this.player.body.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', function(){
        if(this.player.x > 700 && !(this.player.flipX)) {
          this.player.flipX = true;
          this.player.x = 930;
        } else if (this.player.x < 100 && this.player.flipX) {
          this.player.flipX = false;
          this.player.x = 50;
        }

    },this);

  }

  update () { // updates 60 times per second
      this.zombie1.x -= 4;
      this.zombie2.x -= 3;

      if (this.arrowUp.isDown || this.w.isDown) {
     
          // this.player.y -= 2   
        } else if (this.arrowDown.isDown || this.s.isDown) {

          // this.player.y += 2
        } else if (this.arrowLeft.isDown || this.a.isDown) {

          this.player.x -= 7
        } else if (this.arrowRight.isDown || this.d.isDown) {

          this.player.x += 7
         
        }
        
  }
} 


let game = new Phaser.Game(config);  // starts the game utializing the config object
game.scene.add('TitleScene', TitleScene);
game.scene.add("LevelOne", LevelOne);


// Start the title scene
game.scene.start('TitleScene');
// game.scene.start('LevelOne');