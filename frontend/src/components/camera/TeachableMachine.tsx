import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';

function TeachableMachinePoseModel() {
  const [front, setFront] = useState<boolean>(false);

  const setCamera = () => {
    setFront((prev) => !prev);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<tmPose.Webcam>(null);
  useEffect(() => {
    const URL = 'https://teachablemachine.withgoogle.com/models/0W8H0j0wlf/';
    let model: tmPose.CustomPoseNet;
    let ctx: CanvasRenderingContext2D;
    let labelContainer: HTMLDivElement;
    let maxPredictions: number;

    async function init() {
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;

      // load the model and metadata
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      // Convenience function to setup a webcam
      const size = 300;
      const flip = true;
      const facing = front ? 'user' : 'environment';
      webcamRef.current = new tmPose.Webcam(
        window.innerWidth,
        window.innerHeight,
        facing,
        flip,
      ); // width, height, flip

      await webcamRef.current.setup(); // request access to the webcam
      await webcamRef.current.play();
      window.requestAnimationFrame(loop);

      // append/get elements to the DOM
      const canvas = canvasRef.current;
      console.log(webcamRef.current.width, webcamRef.current.height);
      canvas.width = webcamRef.current.width;
      canvas.height = webcamRef.current.height;
      ctx = canvas.getContext('2d');
      labelContainer = labelContainerRef.current;
      for (let i = 0; i < maxPredictions; i += 1) {
        labelContainer.appendChild(document.createElement('div'));
      }
    }

    async function loop(timestamp) {
      webcamRef.current.update(); // update the webcam frame
      await predict();
      window.requestAnimationFrame(loop);
    }

    async function predict() {
      const { pose, posenetOutput } = await model.estimatePose(
        webcamRef.current.canvas,
      );
      const prediction = await model.predict(posenetOutput);

      for (let i = 0; i < maxPredictions; i += 1) {
        const classPrediction = `${prediction[i].className}: ${prediction[
          i
        ].probability.toFixed(2)}`;
        labelContainer.childNodes[i].textContent = classPrediction;
      }

      // 활쏘는 자세
      if (prediction[1].probability > 0.98) {
        alert('카메라 촬영!');
      }

      // finally draw the poses
      drawPose(pose);
    }

    function drawPose(pose) {
      if (webcamRef.current?.canvas) {
        ctx.drawImage(webcamRef.current.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
          const minPartConfidence = 0.5;
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
      }
    }

    init();

    return () => {
      // Cleanup
      webcamRef.current && webcamRef.current.stop();
    };
  }, [front, webcamRef.current?.height, webcamRef.current?.width]);

  return (
    <div>
      <button
        type="button"
        onClick={() => webcamRef.current && webcamRef.current.play()}
      >
        Start
      </button>
      <div>
        <canvas ref={canvasRef} />
      </div>
      <div ref={labelContainerRef} />
      <button type="button" onClick={setCamera}>
        {front ? 'Front' : 'Rear'} camera
      </button>
    </div>
  );
}

export default TeachableMachinePoseModel;
