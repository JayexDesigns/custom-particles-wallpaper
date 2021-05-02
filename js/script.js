var canvas = document.getElementById('particlesCanvas');
var ctx = canvas.getContext('2d');



const setCanvasSize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize();
window.addEventListener('resize', () => {
    setCanvasSize();
    start();
});



class Particle {
    static particles = [];
    static quantity = 50;

    constructor() {
        this.radius = 3;
        this.pos = new Vector2D(
            Math.floor(Math.random() * ((innerWidth - this.radius) - (this.radius)) + this.radius),
            Math.floor(Math.random() * ((innerHeight - this.radius) - (this.radius)) + this.radius)
        );
        this.vel = new Vector2D(
            Math.random() * 1,
            Math.random() * 1
        );
        this.vel.x = (Math.floor(Math.random() * 2) === 0) ? this.vel.x * -1 : this.vel.x;
        this.vel.y = (Math.floor(Math.random() * 2) === 0) ? this.vel.y * -1 : this.vel.y;
        this.vel = this.vel.norm().mul(Math.random() * (1.5 - 0.1) + 0.1);

        Particle.particles.push(this);
    }

    move() {
        this.pos = this.pos.add(this.vel);
        if (this.pos.x + this.radius >= innerWidth || this.pos.x - this.radius <= 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y + this.radius >= innerHeight || this.pos.y - this.radius <= 0) {
            this.vel.y *= -1;
        }
    }

    print() {
        this.connections();
        ctx.beginPath();
        ctx.arc(
            this.pos.x,
            this.pos.y,
            this.radius,
            0, Math.PI * 2, true
        );
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        this.move();
    }

    connections() {
        for (let i = 0; i < Particle.particles.length; ++i) {
            if (Particle.particles[i] !== this) {
                ctx.beginPath();
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(Particle.particles[i].pos.x, Particle.particles[i].pos.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${(this.pos.dist(Particle.particles[i].pos) <= 50) ? 1 : -0.01*this.pos.dist(Particle.particles[i].pos)+1.5})`;
                ctx.stroke();
            }
        }
    }
}



const start = () => {
    Particle.particles = [];
    for (let i = 0; i < Particle.quantity; ++i) {
        new Particle();
    }
    const animate = () => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < Particle.particles.length; ++i) {
            Particle.particles[i].print();
        }
        requestAnimationFrame(animate);
    }
    animate();
}
start();




var stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';