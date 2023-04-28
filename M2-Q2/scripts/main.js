import MainMenuScene from './scenes/MainMenuScene.js'; //imports
import GameScene from './scenes/GameScene.js';
import CreditScene from './scenes/CreditScene.js';
import OverScene from './scenes/OverScene.js';
import WinScene from './scenes/WinScene.js';

let mainMenuScene = new MainMenuScene();
let gameScene = new GameScene();
let creditScene = new CreditScene();
let overScene = new OverScene();
let winScene = new WinScene();

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

let game = new Phaser.Game(config);

game.scene.add("MainMenuScene", mainMenuScene);
game.scene.add("GameScene", gameScene);
game.scene.add("CreditScene", creditScene);
game.scene.add("OverScene", overScene);
game.scene.add("WinScene", winScene);

game.scene.start("MainMenuScene");
 
