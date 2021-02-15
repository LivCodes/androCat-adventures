const config = {   // sets up the game configuration
    type: Phaser.AUTO,
    width: 1000,
    height: 550,
    backgroundColor: `#add8e6`,
    parent: 'gameScreen',
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 500 }, // will affect our player sprite
            debug: true 
        }
    },
    titleMusic: {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
  
  };

  export default config;