"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
  wobbleOffset: number;
};

const PETAL_COLORS = [
  "#e8c99a", // soft-gold
  "#f5ede0", // ivory
  "#c4b5a0", // muted warm
  "#d4a574", // deeper gold
  "#f0e6d3", // light cream
];

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate((petal.rotation * Math.PI) / 180);
  ctx.globalAlpha = petal.opacity;
  ctx.fillStyle = petal.color;

  // Draw a simple petal shape using bezier curves
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    petal.size / 2, -petal.size / 2,
    petal.size, -petal.size / 4,
    0, -petal.size
  );
  ctx.bezierCurveTo(
    -petal.size, -petal.size / 4,
    -petal.size / 2, -petal.size / 2,
    0, 0
  );
  ctx.fill();
  ctx.restore();
}

function createPetal(width: number): Petal {
  return {
    x: Math.random() * width,
    y: -20,
    size: 6 + Math.random() * 10,
    speedY: 0.6 + Math.random() * 1.2,
    speedX: (Math.random() - 0.5) * 0.5,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    opacity: 0.3 + Math.random() * 0.5,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    wobble: 0,
    wobbleSpeed: 0.02 + Math.random() * 0.03,
    wobbleOffset: Math.random() * Math.PI * 2,
  };
}

export function FlowerPetals({ count = 18 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Stagger initial petals across screen
    petalsRef.current = Array.from({ length: count }, (_, i) => ({
      ...createPetal(canvas.width),
      y: (canvas.height / count) * i, // spread vertically at start
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current = petalsRef.current.map((petal) => {
        petal.wobble += petal.wobbleSpeed;
        const wobbleX = Math.sin(petal.wobble + petal.wobbleOffset) * 1.5;

        const updated = {
          ...petal,
          x: petal.x + petal.speedX + wobbleX,
          y: petal.y + petal.speedY,
          rotation: petal.rotation + petal.rotationSpeed,
        };

        // Reset petal when it falls off screen
        if (updated.y > canvas.height + 20) {
          return createPetal(canvas.width);
        }

        drawPetal(ctx, updated);
        return updated;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}