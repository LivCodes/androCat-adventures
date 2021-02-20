

class TitleScene extends Phaser.Scene {
    constructor() {
        super(TitleScene);
        
    }
  
    preload () {
        this.load.image('background', 'assets/images/androtbg.png');
        this.load.audio('titleMusic', 'assets/audio/beatz.mp3')
        this.load.image('zombie1', 'assets/images/png-files/female-zombie/Attack (1).png')
        this.load.image('zombie2', 'assets/images/png-files/male-zombie/Attack (1).png')
    }
  
    create () {
        this.titleMusic = this.sound.add('titleMusic')
        this.titleMusic.play();
        this.bg = this.add.sprite(50,200,'background');
        this.bg.setOrigin(0,0);

        this.text = this.add.text(420,300, 'START GAME', {fontSize: '25px'});
        this.text.setInteractive({ useHandCursor: true });
        this.text.on('pointerdown', () => this.clickButton());
       
        this.zombie1 = this.physics.add.sprite(1000, 475, 'zombie1'); // adds enemy
        this.zombie2 = this.physics.add.sprite(600, 480, 'zombie2'); // adds enemy

        this.zombie1.setScale(0.3)
        this.zombie2.setScale(0.3)

        this.zombie1.flipX = true; // flips the zombie from right to left
        this.zombie2.flipX = true;
        
    }

    update () {
        this.zombie1.x -= 1;
        this.zombie2.x -= 1;
    }
  
    clickButton() {
        this.scene.switch('LevelOne');
        this.titleMusic.stop();
    }
   
  } 

  export default TitleScene;