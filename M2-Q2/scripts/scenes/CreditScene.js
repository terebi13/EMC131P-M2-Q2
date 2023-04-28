export default class CreditScene extends Phaser.Scene{

    constructor() {
        super("CreditScene")
    }

    preload() {

        this.load.image('creditbackground', "../assets/images/credits.png");
        this.load.image('main', "../assets/images/main.png");
    }

    create() {

        this.add.image(500,400, 'creditbackground');

        let backImage = this.add.image(50,50, 'main').setScale(1);
        backImage.setInteractive({ useHandCursor: true });
        backImage.on('pointerdown', () => this.backButton());
    }
    backButton() {

        this.scene.start("MainMenuScene")
    }
}