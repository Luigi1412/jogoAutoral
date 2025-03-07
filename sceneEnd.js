export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    init(data) {
        this.pontuacaoFinal = data.pontuacaoFinal || 0;
    }

    create() {
        this.add.text(300, 250, 'Game Over', { fontSize: '48px', fill: '#FFF' });
        this.add.text(280, 320, 'Pontuação Final: ' + this.pontuacaoFinal, { fontSize: '32px', fill: '#FFF' });

        let restartButton = this.add.text(330, 400, 'Reiniciar', { fontSize: '32px', fill: '#0F0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('InicialScene');
            });

        let instructionsButton = this.add.text(280, 450, 'Voltar às Instruções', { fontSize: '28px', fill: '#FF0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('InstructionsScene');
            });

        let exitButton = this.add.text(350, 500, 'Sair', { fontSize: '28px', fill: '#F00' })
            .setInteractive()
            .on('pointerdown', () => {
                // Usando window.close() para fechar a janela do navegador
                if (window.close) {
                    window.close();
                } else {
                    // Caso window.close() não funcione, você pode recarregar a página ou redirecionar
                    window.location.reload(); 
                }
            });
    }
}
