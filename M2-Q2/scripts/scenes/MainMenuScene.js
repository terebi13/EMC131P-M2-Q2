export default class MainMenuScene extends Phaser.Scene {

    constructor() {
        super("MainMenuScene");
    }

    preload() { 
        this.load.image('background', "../assets/images/bg.png");
        this.load.image('playbackground', "../assets/images/playbg.png");
        this.load.image('play', "../assets/images/play.png");
        this.load.image('exit', "../assets/images/exit.png");
        this.load.image('credits', "../assets/images/creditsbutton.png");
    }

    create() {

        this.add.image(500,400, 'background').setScale(1.0);
        this.add.image(500, 400, 'playbackground').setScale(1.0);
        
        let playImage = this.add.image(500,400, 'play').setScale(1);
        playImage.setInteractive({ useHandCursor: true });
        playImage.on('pointerdown', () => this.playButton());

        let creditsImage = this.add.image(950,450, 'credits').setScale(1);
        creditsImage.setInteractive({ useHandCursor: true });
        creditsImage.on('pointerdown', () => this.creditsButton());

        let quitImage = this.add.image(50,450, 'exit').setScale(1);
        quitImage.setInteractive({ useHandCursor: true });
        quitImage.on('pointerdown', () => {if (confirm("Quit game?")) {window.close()}});
    }
    
    playButton() {
        this.scene.start("GameScene");
    }

    creditsButton() {
        this.scene.start("CreditScene");
    }
}