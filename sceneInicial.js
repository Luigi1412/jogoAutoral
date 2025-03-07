export default class InicialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InicialScene' });
    }

    preload() {
        this.load.image('imagemFundo', 'assets/castelo.png');
        this.load.image('pedra', 'assets/pedra.png');
        this.load.image('dragao1', 'assets/dragao1.png');
        this.load.image('bala', 'assets/bala.png');
    }

    create() {
        this.add.image(400, 300, 'imagemFundo').setScale(0.35);

        this.pontuacao = 0;
        this.tempoRestante = 60;
        
        this.teclado = this.input.keyboard.createCursorKeys();
        
        this.pedras = this.physics.add.staticGroup();
        // Ajuste do tamanho da hitbox da pedra
        let pedra1 = this.pedras.create(100, 500, 'pedra').setScale(0.3).refreshBody();
        pedra1.setSize(50, 50); // Tamanho da hitbox ajustado
        pedra1.setOffset(25, 25); // Para centralizar a hitbox na imagem da pedra

        let pedra2 = this.pedras.create(700, 100, 'pedra').setScale(0.3).refreshBody();
        pedra2.setSize(50, 50); // Tamanho da hitbox ajustado
        pedra2.setOffset(25, 25); // Para centralizar a hitbox na imagem da pedra

        let pedra3 = this.pedras.create(400, 300, 'pedra').setScale(0.3).refreshBody();
        pedra3.setSize(50, 50); // Tamanho da hitbox ajustado
        pedra3.setOffset(25, 25); // Para centralizar a hitbox na imagem da pedra

        this.dragao = this.physics.add.sprite(100, 100, 'dragao1');
        this.dragao.setCollideWorldBounds(true);
        this.physics.add.collider(this.dragao, this.pedras);

        this.balas = this.physics.add.group({
            defaultKey: 'bala',
            maxSize: 10
        });
        this.input.keyboard.on('keydown-SPACE', this.dispararBala, this);

        this.textoPontuacao = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#FFF' });
        this.textoTempo = this.add.text(600, 16, 'Tempo: 60', { fontSize: '32px', fill: '#FFF' });

        this.tempo = this.time.addEvent({
            delay: 1000,
            callback: this.atualizarTempo,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.dragao, this.balas, this.comerBala, null, this);

        this.time.addEvent({
            delay: 3000,
            callback: this.spawnBala,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.dragao.setVelocity(0);

        if (this.teclado.left.isDown) this.dragao.setVelocityX(-200);
        if (this.teclado.right.isDown) this.dragao.setVelocityX(200);
        if (this.teclado.up.isDown) this.dragao.setVelocityY(-200);
        if (this.teclado.down.isDown) this.dragao.setVelocityY(200);
    }

    dispararBala() {
        if (this.balas.getLength() < 10) {
            let bala = this.balas.get();
            if (bala) {
                bala.setActive(true);
                bala.setVisible(true);
                bala.setScale(0.2);
                bala.setPosition(this.dragao.x, this.dragao.y);
                bala.setVelocityX(300);
            }
        }
    }

    comerBala(dragao, bala) {
        this.pontuacao += 1;
        this.textoPontuacao.setText('Pontuação: ' + this.pontuacao);
        bala.setActive(false);
        bala.setVisible(false);
        bala.destroy();
    }

    spawnBala() {
        if (this.balas.getLength() < 5) {
            let x = Phaser.Math.Between(50, 750);
            let y = Phaser.Math.Between(50, 550);
            let bala = this.balas.get(x, y);
            if (bala) {
                bala.setActive(true);
                bala.setVisible(true);
                bala.setScale(0.2);
            }
        }
    }

    atualizarTempo() {
        this.tempoRestante--;
        this.textoTempo.setText('Tempo: ' + this.tempoRestante);
        if (this.tempoRestante <= 0) {
            this.scene.start('EndScene', { pontuacaoFinal: this.pontuacao });
        }
    }
}
