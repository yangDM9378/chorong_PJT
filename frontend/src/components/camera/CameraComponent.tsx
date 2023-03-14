import { useEffect, useRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

export default function CameraComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvas = canvasRef.current;
  useEffect(() => {
    const video = document.createElement('video');
    let model: posenet.PoseNet | null = null;
    let ctx: CanvasRenderingContext2D | null = null;

    if (!canvas || !video) {
      return;
    }

    async function setupCamera() {
      video.width = 640;
      video.height = 480;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user',
          width: 640,
          height: 480,
        },
      });

      video.srcObject = stream;
      await video.play();
    }

    async function loadModel() {
      model = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75,
      });
    }

    function detectPose() {
      if (!model || !ctx || !canvas) {
        return requestAnimationFrame(detectPose);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      async function estimatePoseOnImage() {
        const pose = await model?.estimateSinglePose(canvas, {
          flipHorizontal: false,
        });

        if (pose) {
          posenet.drawKeypoints(canvas, pose.keypoints, {
            radius: 5,
            color: 'red',
          });
        }

        requestAnimationFrame(estimatePoseOnImage);
      }

      requestAnimationFrame(estimatePoseOnImage);
    }

    async function init() {
      await setupCamera();
      await loadModel();

      if (canvas) {
        canvas.width = video.width;
        canvas.height = video.height;
        ctx = canvas.getContext('2d');
      }

      requestAnimationFrame(detectPose);
    }

    init();

    return () => {
      if (video) {
        video.srcObject = null;
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
