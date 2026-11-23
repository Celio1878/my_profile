import { useEffect, useRef } from "react";

/**
 * InteractiveBackground
 *
 * Terminal & Vector Dot-Matrix Grid Canvas.
 * - Subtle ambient emerald node shimmer
 * - Interactive cursor radial illumination (pointer devices only)
 * - Cached color-scheme detection, DPR handling, visibility pause
 * - Reduced-motion: static grid, redrawn on resize
 */
export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const pointerQuery = window.matchMedia("(hover: hover)");
    const reduceMotion = motionQuery.matches;
    const hasPointer = pointerQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dark = darkQuery.matches;

    const mouse = { x: -9999, y: -9999, active: false };
    let rafId = 0;
    let running = true;
    let time = 0;

    const onSchemeChange = (event: MediaQueryListEvent) => {
      dark = event.matches;
      if (reduceMotion) drawGrid();
    };
    darkQuery.addEventListener("change", onSchemeChange);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.scale(dpr, dpr);
      // In reduced-motion mode there is no animation loop to repaint.
      if (reduceMotion) drawGrid();
    }

    resize();
    window.addEventListener("resize", resize);

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

    if (hasPointer) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave);
    }

    const SPACING = 36;
    const PROXIMITY = 160;

    function drawGrid() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      time += 0.015;

      const baseAlpha = dark ? 0.05 : 0.08;
      const baseR = 1.0;

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING;
          const y = r * SPACING;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const wave = Math.sin(time + c * 0.15 + r * 0.15);

          let alpha = baseAlpha;
          let dotRadius = baseR;
          let isHovered = false;

          if (mouse.active && dist < PROXIMITY) {
            const factor = 1 - dist / PROXIMITY;
            alpha = baseAlpha + factor * (dark ? 0.45 : 0.35);
            dotRadius = baseR + factor * 1.5;
            isHovered = true;
          } else if (wave > 0.92) {
            alpha = baseAlpha + (wave - 0.92) * 1.5;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          if (isHovered) {
            ctx.fillStyle = dark ? `rgba(16, 185, 129, ${alpha})` : `rgba(5, 150, 105, ${alpha})`;
          } else {
            ctx.fillStyle = dark ? `rgba(240, 246, 252, ${alpha})` : `rgba(15, 23, 42, ${alpha})`;
          }

          ctx.fill();
        }
      }

      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          PROXIMITY,
        );
        glowGradient.addColorStop(0, dark ? "rgba(16, 185, 129, 0.06)" : "rgba(5, 150, 105, 0.04)");
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, PROXIMITY, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const removePointerListeners = () => {
      if (hasPointer) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
    };

    if (reduceMotion) {
      drawGrid();
      return () => {
        window.removeEventListener("resize", resize);
        darkQuery.removeEventListener("change", onSchemeChange);
        removePointerListeners();
      };
    }

    function loop() {
      if (!running) return;
      drawGrid();
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    function onVisibilityChange() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      darkQuery.removeEventListener("change", onSchemeChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      removePointerListeners();
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-bg" aria-hidden="true" />;
}
