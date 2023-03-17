import React, { useRef, useEffect, useState } from 'react';
import * as tmPose from '@teachablemachine/pose';

function VideoPoseModel() {
  let imageCapture: any;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState<boolean>(false);
  const [twidth, setWidth] = useState(window.innerWidth);
  const [theight, setHeight] = useState(window.innerHeight);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const setCamera = () => {
    setFront((prev) => !prev);
  };
  // 사진찍는 함수
  function onTakePhotoButtonClick() {
    if (!imageCapture) return;
    imageCapture
      .takePhoto()
      .then((blob: any) => createImageBitmap(blob))
      .then((imageBitmap: any) => {
        drawCanvas(captureRef.current, imageBitmap);
      })
      .catch((error: Error) => console.error(error));
  }
  // 사진찍은거 캔버스에 그리는 함수
  function drawCanvas(canvas: HTMLCanvasElement, img: ImageBitmap) {
    canvas.width = parseInt(getComputedStyle(canvas).width.split('px')[0]);
    canvas.height = parseInt(getComputedStyle(canvas).height.split('px')[0]);
    const ratio = Math.min(
      canvas.width / img.width,
      canvas.height / img.height,
    );
    const x = (canvas.width - img.width * ratio) / 2;
    const y = (canvas.height - img.height * ratio) / 2;

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas
      .getContext('2d')
      .drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * ratio,
        img.height * ratio,
      );
  }
  useEffect(() => {
    const URL = 'https://teachablemachine.withgoogle.com/models/0W8H0j0wlf/';

    let model: tmPose.CustomPoseNet | null;
    let ctx: CanvasRenderingContext2D | null;
    let labelContainer: HTMLDivElement | null;
    let maxPredictions: number;
    async function init() {
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;

      // load the model and metadata
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();
      if (videoRef.current) {
        videoRef.current.width = twidth;
        videoRef.current.height = theight;

        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: front ? 'user' : 'environment' },
          })
          .then(function (stream) {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }

            const track = stream.getVideoTracks()[0];
            imageCapture = new ImageCapture(track);
            window.requestAnimationFrame(loop);
          })
          .catch(function (err) {
            console.log(`An error occurred: ${err}`);
          });
      }

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = videoRef.current.width;
        canvas.height = videoRef.current.height;
        ctx = canvas.getContext('2d');
      }
      // ctx = canvas.getContext('2d');
      labelContainer = labelRef.current;
      if (labelContainer) {
        for (let i = 0; i < maxPredictions; i += 1) {
          const div = document.createElement('div');
          labelContainer.appendChild(div);
        }
      }
    }

    async function loop(timestamp) {
      await predict();
      window.requestAnimationFrame(loop);
    }

    async function predict() {
      const { pose, posenetOutput } = await model.estimatePose(
        videoRef.current,
      );
      const prediction = await model.predict(posenetOutput);
      for (let i = 0; i < maxPredictions; i += 1) {
        const classPrediction = `${prediction[i].className}: ${prediction[
          i
        ].probability.toFixed(2)}`;
        labelContainer.childNodes[i].textContent = classPrediction;
      }
      if (prediction[1].probability > 0.9) {
        if (!isRunning) {
          setIsRunning(true);
          console.log('start');
          onTakePhotoButtonClick();
          setIsRunning(false);
        }
      } else {
      }

      drawPose(pose);
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

    init();
  }, [front, labelRef]);

  return (
    <div>
      <div>
        <video ref={videoRef} muted />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div ref={labelRef} />
      <div>
        <canvas ref={captureRef} />
      </div>
      <button type="button" onClick={setCamera}>
        {front ? 'Front' : 'Rear'} camera
      </button>
      <button type="button" onClick={onTakePhotoButtonClick}>
        capture
      </button>
    </div>
  );
}

export default VideoPoseModel;
