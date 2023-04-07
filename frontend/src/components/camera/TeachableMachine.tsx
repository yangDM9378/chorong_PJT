/*eslint-disable*/
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import { setImg } from '../../store/camera/slice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ReactModal from 'react-modal';
import CachedIcon from '@mui/icons-material/Cached';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function TeachableMachinePoseModel() {
  const [front, setFront] = useState<boolean>(false);
  const dispatch = useDispatch();

  const setCamera = () => {
    setFront((prev) => !prev);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelContainerRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<tmPose.Webcam | null>(null);

  const onTakePhotoButtonClick = async () => {
    if (!webcamRef.current) return;
    const canvasTmp = webcamRef.current.canvas;
    const test = canvasTmp.toBlob((blob) => {
      if (!blob) return;
      // let file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' });
      dispatch(setImg(blob));
    }, 'image/jpeg');
    // imageCapture
    //   .takePhoto()
    //   .then((blob: any) => {
    //     createImageBitmap(blob);
    //     // let file = new File([blob], 'test.jpg');
    //     dispatch(setImg(blob));
    //   })
    //   .then((imageBitmap: any) => {
    //     if (captureRef.current) {
    //       drawCanvas(captureRef.current, imageBitmap);
    //     }
    //   })
    //   .catch((error: Error) => console.error(error));
  };

  useEffect(() => {
    const URL_TM = 'https://teachablemachine.withgoogle.com/models/0W8H0j0wlf/';
    let model: tmPose.CustomPoseNet | null;
    let ctx: CanvasRenderingContext2D;
    let labelContainer: HTMLDivElement;
    let maxPredictions: number;

    async function init() {
      const modelURL = `${URL_TM}model.json`;
      const metadataURL = `${URL_TM}metadata.json`;

      // load the model and metadata
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      // Convenience function to setup a webcam
      const size = 400;
      const flip = front;
      const facing = front ? 'user' : 'environment';
      webcamRef.current = new tmPose.Webcam(size, size, flip); // width, height, flip

      await webcamRef.current.setup({
        facingMode: facing,
      }); // request access to the webcam
      await webcamRef.current.play();
      window.requestAnimationFrame(loop);

      // append/get elements to the DOM
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.width = webcamRef.current.width;
        canvas.height = webcamRef.current.height;
        ctx = canvas.getContext('2d')!;
      }
      if (!labelContainerRef.current) return;
      labelContainer = labelContainerRef.current;
      if (!labelContainer) return;
      for (let i = 0; i < maxPredictions; i += 1) {
        labelContainer.appendChild(document.createElement('div'));
      }
    }

    async function loop(timestamp: any) {
      webcamRef.current?.update(); // update the webcam frame
      await predict();
      window.requestAnimationFrame(loop);
    }

    async function predict() {
      if (!model) return;
      if (!webcamRef.current) return;
      const { pose, posenetOutput } = await model.estimatePose(
        webcamRef.current.canvas,
      );
      const prediction = await model.predict(posenetOutput);
      if (!labelContainer) return;
      for (let i = 0; i < maxPredictions; i += 1) {
        const classPrediction = `${prediction[i].className}: ${prediction[
          i
        ].probability.toFixed(2)}`;
        labelContainer.childNodes[i].textContent = classPrediction;
      }
      // 활쏘는 자세
      if (prediction[1].probability > 0.98) {
        // if (accflag === 0) {
        //   console.log('start');
        //   let sum = 0;
        //   let count = 0;
        //   accflag = 1;
        //   const interval = setInterval(() => {
        //     sum += prediction[1].probability;
        //     count += 1;
        //     if (count === 3) {
        //       clearInterval(interval);
        //       const average = sum / count;
        //       console.log(`Average: ${average}`);
        //       if (average > 0.98) {
        //         alert('사진');
        //       }
        //     }
        //   }, 1000);
        // }
      }

      // finally draw the poses
      drawPose(pose);
    }

    function drawPose(pose: any) {
      if (webcamRef.current?.canvas) {
        ctx?.drawImage(webcamRef.current.canvas, 0, 0);

        // draw the keypoints and skeleton

        // if (pose) {
        //   const minPartConfidence = 0.5;
        //   tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        //   tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        // }
      }
    }

    init();

    return () => {
      // Cleanup
      if (webcamRef.current) {
        webcamRef.current.stop();
      }
    };
  }, [front, webcamRef.current?.height, webcamRef.current?.width]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClose = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <div>
        <canvas ref={canvasRef} />
      </div>
      <div ref={labelContainerRef} />
      <button type="button" onClick={setCamera}>
        {front ? 'Front' : 'Rear'} camera
      </button>
      <div>
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
    </div>
  );
}

export default TeachableMachinePoseModel;
