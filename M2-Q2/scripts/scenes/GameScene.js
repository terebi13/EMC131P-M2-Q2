export default class GameScene extends Phaser.Scene{

    constructor() {
        super("GameScene");
    }

    init () {

        this.player;
        this.woods;
        this.barriers;
        this.background;
        this.lasers;

        this.spacebar;
        this.cursors;


        this.lives=5;
        this.livesText;
        this.scoreText;
        this.score=0;
    
    }

    preload () {
        this.load.image('background', "../assets/images/bg.png");
        this.load.image('player', "../assets/images/catcher.png");
        this.load.image('wood', "../assets/images/wood.png");
        this.load.image('barrier', "../assets/images/rock.png");
        this.load.image('fire', "../assets/images/shooter.png");

        this.load.audio('music', '../assets/music/bgmusic.mp3');
        this.load.audio('fire_sfx', '../assets/sfx/firelaser.mp3');
        this.load.audio('break_sfx', '../assets/sfx/woodbreak.mp3');
    }
    create() {

        this.background = this.add.image(500,400, 'background');

        this.music = this.sound.add('music');
        this.fireLaserSFX = this.sound.add('fire_sfx');
        this.woodBreakSFX = this.sound.add('break_sfx');

        this.sfxConfig = {
            mute: false,
            volume: 0.1
        }

        this.musicConfig = {
            mute: false,
            volume: 0.3,
            loop: true
        };

        this.music.play(this.musicConfig);
    
        this.player = this.physics.add.sprite(500, 650, 'player');
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.wood1 = this.add.image(Phaser.Math.Between(150,800),-150, 'wood');
        this.wood2 = this.add.image(Phaser.Math.Between(200,800),-150, 'wood');
        this.wood3 = this.add.image(Phaser.Math.Between(500,800),-150, 'wood');

        this.woods = this.physics.add.group();
        this.woods.add(this.wood1);
        this.woods.add(this.wood2);
        this.woods.add(this.wood3);

        this.physics.add.overlap (this.player, this.woods, woodDamage, null, this);

        function woodDamage(player, wood) {
            this.resetWood(wood);
            this.player.x = 500
            this.player.y = 650
            this.lives -= 1;
            this.livesText.setText('Lives: ' + this.lives);
            if(this.lives == 0) {
                this.music.stop()
                this.physics.pause();
                this.scene.start("OverScene", {score: this.score});
            }
        }

        this.livesText = this.add.text(350,16, 'Lives: ' + this.lives, { font: '24px monospace', fill : '#ffffff'});
        this.scoreText = this.add.text(525,16, 'Score: 0', { font: '24px monospace', fill : '#ffffff'});

        this.barrier1 = this.add.image(Phaser.Math.Between(500,600),-150, 'barrier').setScale(.7);
        this.barrier2 = this.add.image(Phaser.Math.Between(700,800),-150, 'barrier').setScale(.5);

        this.barriers = this.physics.add.group();
        this.barriers.add(this.barrier1);
        this.barriers.add(this.barrier2);

        this.physics.add.overlap (this.player, this.barriers, barrierDamage, null, this);

        function barrierDamage(player, barrier) {
            this.resetBarrier(barrier);
            this.player.x = 500
            this.player.y = 650
            this.lives -= 1;
            this.livesText.setText('Lives: ' + this.lives);
            if(this.lives == 0) {
                this.music.stop()
                this.physics.pause();
                this.scene.start("OverScene", {score: this.score});
            }
            
        }


    }

    update () {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        }
        else {
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

            this.lasers = this.physics.add.sprite(this.player.x, this.player.y-30, 'fire');
            this.fireLaserSFX.play(this.sfxConfig);
            this.lasers.setVelocityY(-500);

            this.physics.add.overlap(this.lasers, this.woods, explode, null, this);

            function explode(lasers,wood) {
                lasers.destroy();
                this.woodBreakSFX.play(this.sfxConfig);
                this.resetWood(wood);
            
                this.score += 1;
                this.scoreText.setText('Score: ' + this.score);
                if(this.score == 50) {
                    this.music.stop()
                    this.scene.start("WinScene", {score: this.score});
                }
            }

        }

        this.moveWood(this.wood1, 0.5);
        this.moveWood(this.wood2, 0.5);
        this.moveWood(this.wood3, 0.5);
        
        this.moveBarrier(this.barrier1, 1);
        this.moveBarrier(this.barrier2, 1);

    }

    moveWood(wood,speed){
        wood.y += speed;
        if (wood.y > 950) {
            this.resetWood(wood);
        }
        if(this.score > 10) {
            wood.y += 0.7;
        }
        if(this.score > 30) {
            wood.y += 0.8;
        }
        if(this.score > 40) {
            wood.y += 1;
        }
    }
    resetWood(wood) {
        wood.y = 0;
        let randomX = Phaser.Math.Between(200,800);
        wood.x = randomX;
    }

    moveBarrier(barrier,speed){
        barrier.y += speed;
        if (barrier.y > 950) {
            this.resetBarrier(barrier);
        }
        if(this.score > 10) {
            barrier.y += 1.2;
        }
    }
    resetBarrier(barrier) {
        barrier.y = 0;
        let randomX = Phaser.Math.Between(200,800);
        barrier.x = randomX;
    }


}
