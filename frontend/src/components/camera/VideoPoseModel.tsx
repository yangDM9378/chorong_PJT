/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setImg } from '../../store/camera/slice';
import * as tmPose from '@teachablemachine/pose';
import ReactModal from 'react-modal';
import CachedIcon from '@mui/icons-material/Cached';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from 'react-router-dom';

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
  const dispatch = useDispatch();

  const setSize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const setCamera = () => {
    setFront((prev) => !prev);
  };
  // 사진찍는 함수
  function onTakePhotoButtonClick() {
    if (!imageCapture) return;
    imageCapture
      .takePhoto()
      .then((blob: any) => {
        createImageBitmap(blob);
        // let file = new File([blob], 'test.jpg');
        dispatch(setImg(blob));
      })
      .then((imageBitmap: any) => {
        if (captureRef.current) {
          drawCanvas(captureRef.current, imageBitmap);
        }
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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      twidth,
      theight,
      x,
      y,
      twidth * ratio,
      theight * ratio,
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
      if (!videoRef.current) return;
      videoRef.current.width = twidth;
      videoRef.current.height = theight;

      navigator.mediaDevices
        .getUserMedia({
          video: {
            height: theight,
            width: twidth,
            facingMode: front ? 'user' : 'environment',
          },
        })
        .then(function (stream) {
          if (!videoRef.current) return;

          videoRef.current.srcObject = stream;
          videoRef.current.play();

          const track = stream.getVideoTracks()[0];
          imageCapture = new ImageCapture(track);
          window.requestAnimationFrame(loop);
        })
        .catch(function (err) {
          console.log(`An error occurred: ${err}`);
        });

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = videoRef.current.width;
      canvas.height = videoRef.current.height;
      ctx = canvas.getContext('2d');
      // ctx = canvas.getContext('2d');
      labelContainer = labelRef.current;
      if (labelContainer) {
        for (let i = 0; i < maxPredictions; i += 1) {
          const div = document.createElement('div');
          labelContainer.appendChild(div);
        }
      }
    }

    async function loop(timestamp: any) {
      await predict();
      window.requestAnimationFrame(loop);
    }

    async function predict() {
      let img: any = null;
      if (!model) return;
      if (!videoRef.current) return;
      if (!imageCapture) return;

      const { pose, posenetOutput } = await model.estimatePose(
        videoRef.current,
        true,
      );
      const prediction = await model.predict(posenetOutput);
      for (let i = 0; i < maxPredictions; i += 1) {
        const classPrediction = `${prediction[i].className}: ${prediction[
          i
        ].probability.toFixed(2)}`;
        if (!labelContainer) return;
        labelContainer.childNodes[i].textContent = classPrediction;
      }
      if (prediction[1].probability > 0.9) {
        onTakePhotoButtonClick();
      }
    }

    function drawPose(pose: any) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      ctx = canvas.getContext('2d');

      if (videoRef.current && ctx) {
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
    setSize();
  }, [front]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClose = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <div>
        <video ref={videoRef} muted />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <span ref={labelRef} />
      <div>
        <canvas ref={captureRef} width={twidth} height={theight} />
      </div>
      <CachedIcon onClick={setCamera} />
      <CameraRoundedIcon onClick={onTakePhotoButtonClick}></CameraRoundedIcon>

      <InfoOutlinedIcon
        onClick={() => {
          setModalIsOpen(true);
        }}
      ></InfoOutlinedIcon>
      <button type="button">
        <Link to="/camera/after">after</Link>
      </button>
      {modalIsOpen && (
        <ReactModal isOpen={modalIsOpen} onRequestClose={handleClose}>
          img
        </ReactModal>
      )}
    </div>
  );
}

export default VideoPoseModel;
