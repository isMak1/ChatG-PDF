"use client"
import { useEffect } from 'react';
import { Application } from '@splinetool/runtime';

const Canvas3D = () => {
  useEffect(() => {
    const load3DAnimation = async () => {
      const canvas = await document.getElementById('canvas3d');
      const app = await new Application(canvas as HTMLCanvasElement);
      app.load('https://prod.spline.design/4SS97rfJC-M-7Hrp/scene.splinecode');
    };

    load3DAnimation();
  }, []);

  return (
      <canvas id="canvas3d"></canvas>
  );
};

export default Canvas3D;
