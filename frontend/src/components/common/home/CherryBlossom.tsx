import React, { useRef, useEffect } from 'react';

const TOTAL = 10;

class Petal {
  x: number;

  y: number;

  w: number;

  h: number;

  opacity: number;

  xSpeed: number;

  ySpeed: number;

  flip: number;

  flipSpeed: number;

  img: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 2 - canvas.height;
    this.w = 30 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 45;
    this.xSpeed = Math.random();
    this.ySpeed = Math.random() * 0.5;
    this.flip = Math.random();
    this.flipSpeed = Math.random() * 0.03;
    this.img = new Image();
    this.img.src = '/main/petal.png';
  }

  private draw(ctx: CanvasRenderingContext2D) {
    if (this.y > ctx.canvas.height || this.x > ctx.canvas.width) {
      this.x = -this.img.width;
      this.y = Math.random() * ctx.canvas.height * 2 - ctx.canvas.height;
      this.xSpeed = 2 + Math.random();
      this.ySpeed = 1 + Math.random() * 0.5;
      this.flip = Math.random();
    }
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w * (0.66 + Math.abs(Math.cos(this.flip)) / 3),
      this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 2),
    );
  }

  public animate(ctx: CanvasRenderingContext2D) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.draw(ctx);
    this.flip += this.flipSpeed;
  }
}

export default function CherryBlossom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width, canvas.height);
    const petalArray: Petal[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < TOTAL; i++) {
      petalArray.push(new Petal(canvas));
    }

    function render() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petalArray.forEach((petal) => {
          petal.animate(ctx);
        });

        window.requestAnimationFrame(render);
      }
    }
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    render();
  }, []);
  return (
    <div className="overflow-hidden w-[100%] h-[100%]">
      <canvas ref={canvasRef} />
    </div>
  );
}
