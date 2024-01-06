"use client"

import { useEffect } from 'react';
import { Application } from '@splinetool/runtime'; // Replace with the actual path to your 3D library

const My3DComponent = () => {
  useEffect(() => {
    const load3DAnimation = async () => {
      const canvas = await document.getElementById('canvas3d');
      const app = await new Application(canvas as HTMLCanvasElement);
      app.load('https://prod.spline.design/XbuZLlekGmH3INTE/scene.splinecode');
    };

    load3DAnimation();
  }, []);

  return (
    <div className='w-full h-screen'>
      <canvas id="canvas3d"></canvas>
    </div>
  );
};

export default My3DComponent;
