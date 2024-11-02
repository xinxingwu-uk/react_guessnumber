// firework.js

class Firework {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.colors = ["#ff1f1f", "#ff7e1f", "#fffb1f", "#1fff3f", "#1ffbff", "#7e1fff"];
    this.animationFrameId = null;
  }

  start() {
    this.createParticles();
    this.animate();
  }

  stop() {
    cancelAnimationFrame(this.animationFrameId);
    this.clear();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createParticles() {
    const particleCount = 200; // Increase particle count for a bigger explosion
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 3; // Move explosion slightly higher

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = Math.random() * 3 + 3; // Adjust speed to make particles spread more
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];

      this.particles.push({
        x: centerX,
        y: centerY,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color: color,
        radius: Math.random() * 3 + 1, // Slightly larger radius for more visible particles
        alpha: 1,
        decay: Math.random() * 0.003 + 0.002, // Slower decay for longer-lasting particles
      });
    }
  }

  animate() {
    this.clear();

    this.particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.alpha -= particle.decay;

      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }

      this.drawParticle(particle);
    });

    if (this.particles.length > 0) {
      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  drawParticle(particle) {
    this.ctx.save();
    this.ctx.globalAlpha = particle.alpha;
    this.ctx.fillStyle = particle.color;
    this.ctx.shadowBlur = 8; // Add shadow for glowing effect
    this.ctx.shadowColor = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
}

// Export the Firework class
window.Firework = Firework;
