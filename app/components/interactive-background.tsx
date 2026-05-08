import { useEffect, useRef } from "react";

/**
 * InteractiveBackground
 *
 * A lightweight canvas-based animated background that reacts to:
 *  - mouse movement (particles are gently attracted toward the cursor and
 *    a soft glow follows it)
 *  - scrolling (the particle field shifts/parallaxes and hue rotates with
 *    scroll position)
 *
 * Implementation notes:
 *  - Fixed, full-viewport canvas behind the content (z-index: -1, pointer-events: none)
 *  - Respects `prefers-reduced-motion` (renders a single static frame)
 *  - Adapts particle count to viewport size for performance
 *  - Uses devicePixelRatio for crisp rendering
 *  - Pauses when the tab is hidden
 */
export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      baseR: number;
    };
    let particles: Particle[] = [];

    const mouse = { x: -9999, y: -9999, active: false };
    let scrollY = window.scrollY;
    let scrollTarget = window.scrollY;
    let rafId = 0;
    let running = true;

    function isDark() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Particle count scales with screen area; capped for perf
      const area = width * height;
      const target = Math.round(Math.min(120, Math.max(40, area / 16000)));
      if (particles.length !== target) {
        particles = new Array(target).fill(0).map(() => spawn());
      }
    }

    function spawn(): Particle {
      const baseR = Math.random() * 1.6 + 0.6;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: baseR,
        baseR,
      };
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onMouseLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }
    function onScroll() {
      scrollTarget = window.scrollY;
    }
    function onVisibility() {
      running = !document.hidden;
      if (running) {
        rafId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(rafId);
      }
    }

    function draw() {
      // smooth scroll interpolation for parallax
      scrollY += (scrollTarget - scrollY) * 0.08;

      ctx!.clearRect(0, 0, width, height);

      const dark = isDark();
      const hue = (scrollY * 0.05) % 360;

      // Background radial glow following the mouse
      if (mouse.active) {
        const grad = ctx!.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          280,
        );
        const glow = dark
          ? `hsla(${(hue + 220) % 360}, 80%, 60%, 0.18)`
          : `hsla(${(hue + 200) % 360}, 90%, 55%, 0.12)`;
        grad.addColorStop(0, glow);
        grad.addColorStop(1, "transparent");
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, width, height);
      }

      const parallax = (scrollY * 0.15) % height;

      // Update + draw particles
      for (const p of particles) {
        // base motion
        p.x += p.vx;
        p.y += p.vy;

        // mouse attraction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 200 * 200) {
            const dist = Math.sqrt(dist2) || 1;
            const force = (1 - dist / 200) * 0.6;
            p.vx += (dx / dist) * force * 0.05;
            p.vy += (dy / dist) * force * 0.05;
            p.r = p.baseR + (1 - dist / 200) * 2;
          } else {
            p.r += (p.baseR - p.r) * 0.1;
          }
        } else {
          p.r += (p.baseR - p.r) * 0.1;
        }

        // friction
        p.vx *= 0.985;
        p.vy *= 0.985;

        // wrap around edges (with parallax offset on Y)
        const py = (p.y + parallax) % height;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // draw
        const pHue = (hue + (p.x + p.y) * 0.05) % 360;
        ctx!.beginPath();
        ctx!.fillStyle = dark
          ? `hsla(${pHue}, 70%, 70%, 0.85)`
          : `hsla(${pHue}, 65%, 45%, 0.75)`;
        ctx!.arc(p.x, py, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Connections between nearby particles
      const maxDist = 130;
      const maxDist2 = maxDist * maxDist;
      ctx!.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ay = (a.y + parallax) % height;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const by = (b.y + parallax) % height;
          const dx = a.x - b.x;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist2) {
            const alpha = (1 - d2 / maxDist2) * (dark ? 0.35 : 0.25);
            ctx!.strokeStyle = dark
              ? `hsla(${(hue + 200) % 360}, 70%, 70%, ${alpha})`
              : `hsla(${(hue + 200) % 360}, 65%, 40%, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, ay);
            ctx!.lineTo(b.x, by);
            ctx!.stroke();
          }
        }
      }
    }

    function loop() {
      if (!running) return;
      draw();
      rafId = requestAnimationFrame(loop);
    }

    resize();

    if (reduceMotion) {
      // single static render, no animation loop
      draw();
    } else {
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="interactive-bg" />
  );
}
