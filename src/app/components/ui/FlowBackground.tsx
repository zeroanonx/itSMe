"use client";

import { useEffect, useRef } from "react";
import { Application, Graphics, Particle, ParticleContainer } from "pixi.js";
import { createNoise3D } from "simplex-noise";

export default function FlowBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  // 注意：两个 ref，职责分离
  const appRef = useRef<Application | null>(null);
  const destroyedRef = useRef(false);

  useEffect(() => {
    destroyedRef.current = false;

    const noise = createNoise3D();

    const setup = async () => {
      if (!hostRef.current) return;

      const app = new Application();

      // init 之前不要写入 ref
      await app.init({
        backgroundAlpha: 0,
        resizeTo: window,
        antialias: true,
        autoDensity: true,
      });

      //  如果在 await 期间已经 unmount，立刻销毁
      if (destroyedRef.current) {
        app.destroy();
        return;
      }

      appRef.current = app;
      hostRef.current.appendChild(app.canvas);

      const container = new ParticleContainer({
        dynamicProperties: { position: true, alpha: true },
      });
      app.stage.addChild(container);

      const g = new Graphics().circle(0, 0, 1).fill(0xffffff);
      const texture = app.renderer.generateTexture(g);

      const particles: Particle[] = [];
      const spacing = 16;

      for (let x = 0; x < window.innerWidth; x += spacing) {
        for (let y = 0; y < window.innerHeight; y += spacing) {
          const p = new Particle(texture);
          p.x = x;
          p.y = y;
          p.alpha = Math.random();
          container.addParticle(p);
          particles.push(p);
        }
      }

      app.ticker.add(() => {
        const t = performance.now() / 8000;
        for (const p of particles) {
          const n = noise(p.x / 200, p.y / 200, t);
          p.x += Math.cos(n * Math.PI * 2) * 0.3;
          p.y += Math.sin(n * Math.PI * 2) * 0.3;
        }
      });
    };

    setup();

    return () => {
      destroyedRef.current = true;

      // 双重保护
      const app = appRef.current as any;
      if (app && !app.destroyed) {
        app.destroy(true);
      }
      appRef.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
