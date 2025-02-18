class MatrixEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = [];
        this.fontSize = 14;
        this.isActive = true;
        this.speed = 1;
        this.characterSet = 'matrix';

        // Character sets
        this.charsets = {
            matrix: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヌ",
            numbers: "0123456789",
            binary: "01",
            hex: "0123456789ABCDEF",
            asian: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヌ"
        };

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.initializeCharacters();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.initializeCharacters();
    }

    initializeCharacters() {
        this.characters = [];
        for (let i = 0; i < this.columns; i++) {
            this.characters[i] = {
                x: i * this.fontSize,
                y: Math.random() * -100,
                text: this.getRandomChar(),
                speed: Math.random() * 2 + 1
            };
        }
    }

    getRandomChar() {
        const charset = this.charsets[this.characterSet] || this.charsets.matrix;
        return charset[Math.floor(Math.random() * charset.length)];
    }

    setCharacterSet(set) {
        if (this.charsets[set]) {
            this.characterSet = set;
        }
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    toggleEffect(force) {
        if (typeof force === 'boolean') {
            this.isActive = force;
        } else {
            this.isActive = !this.isActive;
        }
        return this.isActive;
    }

    animate() {
        if (!this.isActive) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.characters.length; i++) {
            const char = this.characters[i];
            this.ctx.fillText(char.text, char.x, char.y);

            char.y += char.speed * this.speed;

            // Reset character position and change text
            if (char.y > this.canvas.height) {
                char.y = Math.random() * -100;
                char.text = this.getRandomChar();
            }

            // Randomly change characters
            if (Math.random() > 0.98) {
                char.text = this.getRandomChar();
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix Effect
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix');
    if (canvas) {
        window.matrixEffect = new MatrixEffect(canvas);
    }
}); 