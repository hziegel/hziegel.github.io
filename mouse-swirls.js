// mouse-swirls.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.id = 'swirlCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const colors = ["#8b7bff", "#5e4bff", "#b8c7ff", "#a18bff"];
  const particles = [];
  const numParticles = 60;
  let mouse = { x: width / 2, y: height / 2 };

  // Particle constructor
  class Particle {
    constructor(i) {
      this.angle = Math.random() * Math.PI * 2;
      this.radius = 40 + Math.random() * 80;
      this.orbitSpeed = 0.01 + Math.random() * 0.02;
      this.size = 2 + Math.random() * 3;
      this.color = colors[i % colors.length];
    }
    update() {
      this.angle += this.orbitSpeed;
      const swirlRadius = this.radius + Math.sin(Date.now() * 0.002) * 10;
      this.x = mouse.x + Math.cos(this.angle) * swirlRadius;
      this.y = mouse.y + Math.sin(this.angle) * swirlRadius;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(i));
  }

  // Handle resizing
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track mouse
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Animate particles
  function animate() {
    ctx.fillStyle = "rgba(14, 12, 26, 0.15)"; // fade for trailing effect
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
