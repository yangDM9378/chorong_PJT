import * as tmPose from '@teachablemachine/pose';
import * as tf from '@tensorflow/tfjs';
import React, { useEffect, useRef } from 'react';

export default function TeachableMachine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelContainerRef = useRef<HTMLDivElement>(null);

  const URL = 'https://teachablemachine.withgoogle.com/models/0W8H0j0wlf/';
  let model: any = null;
  let webcam: tmPose.Webcam | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let labelContainer: HTMLDivElement | null = null;
  let maxPredictions = 0;

  useEffect(() => {
    init();
    return () => {
      if (webcam) webcam.stop();
    };
  }, []);

  async function init() {
    const modelURL = `${URL}model.json`;
    const metadataURL = `${URL}metadata.json`;

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const size = 300;
    const flip = true;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = size;
      canvas.height = size;
      ctx = canvas.getContext('2d');
      labelContainer = labelContainerRef.current;
      if (labelContainer) {
        for (let i = 0; i < maxPredictions; i += 1) {
          labelContainer.appendChild(document.createElement('div'));
        }
      }
    }
  }

  async function loop(timestamp: number) {
    if (webcam) webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    if (model && webcam && ctx && labelContainer) {
      const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
      const prediction = await model.predict(posenetOutput);

      for (let i = 0; i < maxPredictions; i += 1) {
        const classPrediction = `${prediction[i].className}: ${prediction[
          i
        ].probability.toFixed(2)}`;
        labelContainer.childNodes[i].textContent = classPrediction;
      }

      if (prediction[1].probability > 0.98) {
        alert('카메라 촬영!');
      }

      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  return (
    <div>
      <div>Teachable Machine Pose Model</div>
      <button type="button" onClick={init}>
        Start
      </button>
      <div>
        <canvas ref={canvasRef} />
      </div>
      <div ref={labelContainerRef} />
    </div>
  );
}
