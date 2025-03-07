export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionsScene' });
    }

    create() {
        this.add.text(200, 200, 'Instruções do Jogo', { fontSize: '40px', fill: '#FFF' });
        this.add.text(150, 280, 'O objetivo do jogo é comer a maior quantidade de doces antes do tempo acabar!', 
            { fontSize: '24px', fill: '#FFF', wordWrap: { width: 500 } });
        
        let startButton = this.add.text(300, 400, 'Iniciar Jogo', { fontSize: '32px', fill: '#0F0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('InicialScene');
            });
    }
}