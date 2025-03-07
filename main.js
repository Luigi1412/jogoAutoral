import InicialScene from "./sceneInicial.js";
import EndScene from "./sceneEnd.js";
import InstructionsScene from "./sceneTutorial.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [InstructionsScene,InicialScene, EndScene]
};

const game = new Phaser.Game(config);