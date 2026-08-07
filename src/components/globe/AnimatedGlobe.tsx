import React, { useEffect, useRef } from 'react';

export const AnimatedGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 400);
    let height = (canvas.height = 400);
    const radius = 160;
    const center = { x: width / 2, y: height / 2 };
    
    // Generate synthetic longitude / latitude nodes for infrastructure sites
    const nodes: { lat: number; lng: number; size: number; color: string }[] = [];
    const colors = ['#06B6D4', '#10B981', '#3B82F6', '#F59E0B', '#A855F7'];
    for (let i = 0; i < 90; i++) {
      nodes.push({
        lat: (Math.random() - 0.5) * 160,
        lng: Math.random() * 360,
        size: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let angle = 0;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.006;

      // Outer cyber atmosphere aura
      const grad = ctx.createRadialGradient(center.x, center.y, radius * 0.8, center.x, center.y, radius * 1.3);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      grad.addColorStop(0.6, 'rgba(30, 58, 138, 0.05)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw wireframe latitudes & longitudes
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
      ctx.lineWidth = 1;
      for (let r = 40; r <= radius; r += 40) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render rotating infrastructure nodes
      nodes.forEach((node) => {
        // Simple spherical projection approximation
        const radLng = (node.lng + (angle * 180 / Math.PI)) * (Math.PI / 180);
        const radLat = node.lat * (Math.PI / 180);

        const x = center.x + radius * Math.cos(radLat) * Math.sin(radLng);
        const y = center.y + radius * Math.sin(radLat);
        const z = Math.cos(radLng) * Math.cos(radLat);

        // Only draw front face of globe
        if (z > -0.2) {
          const alpha = Math.min(1, Math.max(0.1, z + 0.3));
          ctx.fillStyle = node.color;
          ctx.globalAlpha = alpha;
          
          ctx.beginPath();
          ctx.arc(x, y, node.size * (0.8 + z * 0.5), 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby front nodes with cyber lines
          if (z > 0.4 && Math.random() < 0.1) {
            ctx.strokeStyle = node.color;
            ctx.globalAlpha = alpha * 0.4;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(center.x + (x - center.x) * 0.6, center.y + (y - center.y) * 0.6);
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1.0;

      // Central core AI pulse
      ctx.fillStyle = '#0B0D14';
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius * 0.98, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[420px] h-[420px] mx-auto pointer-events-none select-none">
      <canvas ref={canvasRef} width="400" height="400" className="w-[400px] h-[400px]" />
      <div className="absolute bottom-4 bg-slatenavy/90 border border-cyan-500/40 px-4 py-1.5 rounded-full shadow-xl flex items-center gap-2 font-mono text-xs">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span className="text-primary font-bold tracking-widest">GLOBAL AI ESCROW GRID: ONLINE</span>
      </div>
    </div>
  );
};
