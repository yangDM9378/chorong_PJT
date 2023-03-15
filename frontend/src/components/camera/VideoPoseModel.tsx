import React, { useRef, useEffect, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';

function VideoPoseModel() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const labelRef = useRef();
  const [front, setFront] = useState<boolean>(false);
  const [twidth, setWidth] = useState(window.innerWidth);
  const [theight, setHeight] = useState(window.innerHeight);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const setCamera = () => {
    setFront((prev) => !prev);
  };
  function onWindowResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    const URL = 'https://teachablemachine.withgoogle.com/models/0W8H0j0wlf/';
    const modelURL = `${URL}model.json`;
    const metadataURL = `${URL}metadata.json`;

    let model: tmPose.CustomPoseNet;
    let ctx: CanvasRenderingContext2D;
    let labelContainer: HTMLDivElement;
    let maxPredictions: number;

    async function init() {
      // load the model and metadata
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = videoRef.current.width;
        canvas.height = videoRef.current.height;
        ctx = canvas.getContext('2d');
      }
      // ctx = canvas.getContext('2d');
      labelContainer = labelRef.current;
      for (let i = 0; i < maxPredictions; i += 1) {
        labelContainer.appendChild(document.createElement('div'));
      }
      videoRef.current.width = twidth;
      videoRef.current.height = theight;

      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: front ? 'user' : 'environment' } })
        .then(function (stream) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          window.requestAnimationFrame(loop);
        })
        .catch(function (err) {
          console.log(`An error occurred: ${err}`);
        });
    }
    init();

    async function loop(timestamp) {
      await predict();
      window.requestAnimationFrame(loop);
    }

    async function predict() {
      const { pose, posenetOutput } = await model.estimatePose(
        videoRef.current,
      );

      const prediction = await model.predict(posenetOutput);
      drawPose(pose);

      for (let i = 0; i < maxPredictions; i += 1) {
        const classPrediction = `${prediction[i].className}: ${prediction[
          i
        ].probability.toFixed(2)}`;
        labelContainer.childNodes[i].textContent = classPrediction;
      }

      if (prediction[1].probability > 0.98) {
        if (!isRunning) {
          console.log('start');
          setIsRunning(true);
          let sum = 0;
          let count = 0;
          const interval = setInterval(() => {
            sum += prediction[1].probability;
            count += 1;
            if (count === 3) {
              clearInterval(interval);
              const average = sum / count;
              console.log(`Average: ${average}`);
              if (average > 0.98) {
                alert('사진');
              }
            }
          }, 1000);
          setIsRunning(false);
        }
      }
    }

    function drawPose(pose) {
      const canvas = canvasRef.current;

      ctx = canvas.getContext('2d');

      if (videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0);
        if (pose) {
          const minPartConfidence = 0.5;
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        } else {
          // 포즈를 인식하지 못한 경우, 기본적으로 빨간색으로 표시
          ctx.fillStyle = 'red';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, []);

  return (
    <div>
      <div>
        <video ref={videoRef} muted />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div ref={labelRef} />
      <button type="button" onClick={setFront}>
        {front ? 'Front' : 'Rear'} camera
      </button>
    </div>
  );
}

export default VideoPoseModel;
