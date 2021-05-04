var canvas = document.getElementById('particlesCanvas');
var ctx = canvas.getContext('2d');

var stats;



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
    static quantity = 250;

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
        if (this.pos.x - this.radius - 1 >= innerWidth) {
            this.pos.x = 0 - this.radius;
        }
        else if (this.pos.x + this.radius + 1 <= 0) {
            this.pos.x = innerWidth + this.radius;
        }
        if (this.pos.y - this.radius - 1 >= innerHeight) {
            this.pos.y = 0 - this.radius;
        }
        else if (this.pos.y + this.radius + 1 <= 0) {
            this.pos.y = innerHeight + this.radius;
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
                if (-0.01*this.pos.dist(Particle.particles[i].pos)+1.5 > 0) {
                    ctx.beginPath();
                    ctx.moveTo(this.pos.x, this.pos.y);
                    ctx.lineTo(Particle.particles[i].pos.x, Particle.particles[i].pos.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(this.pos.dist(Particle.particles[i].pos) <= 50) ? 1 : -0.01*this.pos.dist(Particle.particles[i].pos)+1.5})`;
                    ctx.stroke();
                }
            }
        }
    }
}



const start = () => {
    Particle.particles = [];
    for (let i = 0; i < Particle.quantity; ++i) {
        new Particle();
    }
    stats = createStats();
    document.body.appendChild( stats.domElement );
    const animate = () => {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < Particle.particles.length; ++i) {
            Particle.particles[i].print();
        }
        stats.update();
        requestAnimationFrame(animate);
    }
    animate();
}
start();




function createStats() {
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';

    return stats;
}