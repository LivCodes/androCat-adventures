

class TitleScene extends Phaser.Scene {
    constructor() {
        super(TitleScene);
        
    }
  
    preload () {
        this.load.image('background', 'assets/images/androtbg.png');
        this.load.audio('titleMusic', 'assets/audio/beatz.mp3')
    }
  
    create () {
        this.titleMusic = this.sound.add('titleMusic')
        this.titleMusic.play();
        this.bg = this.add.sprite(50,200,'background');
        this.bg.setOrigin(0,0);

        this.text = this.add.text(400,400, 'START GAME', {fontSize: '25px'});
        this.text.setInteractive({ useHandCursor: true });
        this.text.on('pointerdown', () => this.clickButton());
       
        
    }
  
    clickButton() {
        this.scene.switch('LevelOne');
        this.titleMusic.stop();
    }
   
  } 

  export default TitleScene;