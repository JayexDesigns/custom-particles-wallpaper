var canvas = document.getElementById('particlesCanvas');
var ctx = canvas.getContext('2d');

var stats;



const changeCanvasColor = () => {
    if (transparentBackground) {
        canvas.style.backgroundColor = "rgba(0,0,0,0)";
    }
    else {
        canvas.style.backgroundImage = `radial-gradient(circle, ${backgroundColor1} 0%, ${backgroundColor2} 100%)`;
    }
}



const setCanvasSize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
setCanvasSize();
window.addEventListener('resize', () => {
    setCanvasSize();
});



class Particle {
    static particles = [];

    constructor() {
        this.radius = particleRadius;
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
        this.vel = this.vel.norm().mul(Math.random() * (maxVelocity - minVelocity) + minVelocity);

        Particle.particles.push(this);
    }

    move() {
        this.pos = this.pos.add(this.vel);
        if (this.pos.x - this.radius - disapearOffset >= innerWidth && this.vel.x > 0) {
            this.pos.x = 0 - this.radius - disapearOffset;
        }
        else if (this.pos.x + this.radius + disapearOffset <= 0 && this.vel.x < 0) {
            this.pos.x = innerWidth + this.radius + disapearOffset;
        }
        if (this.pos.y - this.radius - disapearOffset >= innerHeight && this.vel.y > 0) {
            this.pos.y = 0 - this.radius - disapearOffset;
        }
        else if (this.pos.y + this.radius + disapearOffset <= 0 && this.vel.y < 0) {
            this.pos.y = innerHeight + this.radius + disapearOffset;
        }
    }

    print() {
        if (lineWidth > 0) {
            this.connections();
        }
        if (particleRadius > 0) {
            ctx.beginPath();
            ctx.arc(
                this.pos.x,
                this.pos.y,
                this.radius,
                0, Math.PI * 2, true
            );
            ctx.fillStyle = particleColor;
            ctx.fill();
        }
        this.move();
    }

    connections() {
        for (let i = 0; i < Particle.particles.length; ++i) {
            if (Particle.particles[i] !== this) {
                let distance = this.pos.squaredDist(Particle.particles[i].pos);
                if (distance < maxDistOpacity**2) {
                    ctx.beginPath();
                    ctx.moveTo(this.pos.x, this.pos.y);
                    ctx.lineTo(Particle.particles[i].pos.x, Particle.particles[i].pos.y);
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = `rgba(${parseInt(lineColor.slice(1, 3), 16)}, ${parseInt(lineColor.slice(3, 5), 16)}, ${parseInt(lineColor.slice(5, 7), 16)}, ${(distance <= minDistOpacity**2) ? 1 : slope*Math.sqrt(distance)+height})`;
                    ctx.stroke();
                }
            }
        }
    }
}



var reqAnim;
var slope;
var height;
const start = () => {
    slope = 1/(minDistOpacity - maxDistOpacity);
    height = -slope * minDistOpacity + 1;

    Particle.particles = [];
    for (let i = 0; i < particleQuantity; ++i) {
        new Particle();
    }
    var last = performance.now() / 1000;
    var fpsThreshold = 0;
    const animate = () => {
        reqAnim = requestAnimationFrame(animate);

        var now = performance.now() / 1000;
        var dt = Math.min(now - last, 1);
        last = now;
        if (fpsLimit > 0) {
            fpsThreshold += dt;
            if (fpsThreshold < 1.0 / fpsLimit) {
                return;
            }
            fpsThreshold -= 1.0 / fpsLimit;
        }

        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < Particle.particles.length; ++i) {
            Particle.particles[i].print();
        }
        if (showFPS && stats) {
            stats.update();
        }
        else if (showFPS) {
            stats = createStats();
            stats.domElement.classList.add("fpsStats")
            document.body.appendChild(stats.domElement);
        }
        else if (document.getElementsByClassName("fpsStats").length !== 0) {
            stats = undefined;
            document.getElementsByClassName("fpsStats")[0].remove();
        }
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