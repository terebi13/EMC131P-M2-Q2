export default class WinScene extends Phaser.Scene{

    constructor(){
       super("WinScene");
    }

    init (data) { // get data score from gamescene

        console.log('init', data);
        this.finalScore = data.score;
        
     }

     preload () {
        this.load.image('background', "../assets/images/bg.png");
        this.load.image('scorebackground', "../assets/images/scorebg.png");
        this.load.image('player', "../assets/images/catcher.png");
        this.load.image('replay', "../assets/images/replay.png"); 
        this.load.image('main', "../assets/images/main.png"); 

        this.load.audio('win_sfx', '../assets/sfx/win.mp3');

     }

     create () {
        this.add.image(500,400, 'background').setScale(1.0);
        this.add.image(500, 400, 'scorebackground').setScale(1.0);
        this.player = this.physics.add.sprite(500, 650, 'player');

        this.winSFX = this.sound.add('win_sfx');

        this.sfxConfig = {
            mute: false,
            volume: 0.2
        }

        this.winSFX.play();


        this.add.text(580, 310, ' ' + this.finalScore, {font: 'bold 90px Arial Black', fill:'#F1AF2B' });

        let replayImage = this.add.image(450,480, 'replay').setScale(1.2);
        replayImage.setInteractive({ useHandCursor: true });
        replayImage.on('pointerdown', () => this.replayButton());

        let mainImage = this.add.image(550, 480, 'main').setScale(1.2);
        mainImage.setInteractive({ useHandCursor: true });
        mainImage.on('pointerdown', () => this.mainButton());
    
     }

     replayButton() {
        this.scene.start("GameScene");
     }

     mainButton() {
        this.scene.start("MainMenuScene");
     }

}