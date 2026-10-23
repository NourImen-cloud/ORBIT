import React, { useEffect, useRef } from 'react';

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    // RPG Fantasy Night Palette: Purple, Lavender, Gold, Diamond Blue
    const starColors = ['#ffffff', '#e9d5ff', '#c084fc', '#fef08a', '#a855f7', '#67e8f9'];
    let stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    const initStars = () => {
      const count = Math.floor((width * height) / 3000);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.5,
          baseAlpha: Math.random() * 0.7 + 0.25,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          phase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }
    };

    initStars();

    const maybeSpawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.018) {
        shootingStars.push({
          x: Math.random() * width * 0.85,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 7 + 8,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1,
          active: true
        });
      }
    };

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep mystical violet background gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.75,
        height * 0.15,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, 'rgba(46, 16, 101, 0.5)'); // Deep purple glow near moon
      bgGrad.addColorStop(0.35, 'rgba(24, 11, 49, 0.45)');
      bgGrad.addColorStop(0.8, 'rgba(11, 8, 19, 0.8)');
      bgGrad.addColorStop(1, 'rgba(7, 5, 13, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Luminous Cosmic Moon in Top-Right
      const moonX = width * 0.88;
      const moonY = Math.min(height * 0.14, 120);
      const moonRadius = 38;

      // Moon outer purple aura
      const moonAura = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.8, moonX, moonY, moonRadius * 2.8);
      moonAura.addColorStop(0, 'rgba(216, 180, 254, 0.35)');
      moonAura.addColorStop(0.5, 'rgba(168, 85, 247, 0.12)');
      moonAura.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = moonAura;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Moon body
      const moonGrad = ctx.createRadialGradient(moonX - 8, moonY - 8, 5, moonX, moonY, moonRadius);
      moonGrad.addColorStop(0, '#faf5ff');
      moonGrad.addColorStop(0.6, '#e9d5ff');
      moonGrad.addColorStop(0.9, '#c084fc');
      moonGrad.addColorStop(1, '#9333ea');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Moon craters (stylized)
      ctx.fillStyle = 'rgba(147, 51, 234, 0.35)';
      ctx.beginPath();
      ctx.arc(moonX - 10, moonY - 6, 7, 0, Math.PI * 2);
      ctx.arc(moonX + 12, moonY + 8, 9, 0, Math.PI * 2);
      ctx.arc(moonX - 6, moonY + 14, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.twinkleSpeed;
        const currentAlpha = Math.max(0.15, s.baseAlpha + Math.sin(s.phase) * 0.4);

        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Shooting Stars
      maybeSpawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) {
          shootingStars.splice(i, 1);
          continue;
        }

        const headX = ss.x;
        const headY = ss.y;
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, 'rgba(192, 132, 252, 0)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.012;

        if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
          ss.active = false;
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
};
