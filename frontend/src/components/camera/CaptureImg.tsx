import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as tmPose from '@teachablemachine/pose';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../api/firebase';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';
import { authApi } from '../../libs/axiosConfig';

export default function CaptureImg() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  img!.arrayBuffer().then((arrayBuffer) => {
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: img!.type });
  });
  const imgSrc = URL.createObjectURL(img!);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const culturalId = 1;
  const poseId = 1;

  const submitImg = async (e: any) => {
    e.preventDefault();
    console.log(img?.name);
    if (img !== undefined) {
      const storageRef = ref(storage, `files/${uuidv4()}`);
      const uploadTask = uploadBytes(storageRef, img);
      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const payload = {
            culturalPropertyId: culturalId,
            picture: downloadURL,
          };
          authApi
            .post('/galleries', payload)
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }
  };

  const predict = () => {
    const URL = 'https://teachablemachine.withgoogle.com/models/0W8H0j0wlf/';

    let model: tmPose.CustomPoseNet | null;
    let maxPredictions: number;

    async function init() {
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      predict2();
      async function predict2() {
        if (!model) return;

        const { pose, posenetOutput } = await model.estimatePose(
          imgRef.current!,
          true,
        );
        const prediction = await model.predict(posenetOutput);
        for (let i = 0; i < maxPredictions; i += 1) {
          const classPrediction = `${prediction[i].className}: ${prediction[
            i
          ].probability.toFixed(2)}`;
        }
        if (prediction[poseId].probability > 0.9) {
          alert('포즈 성공');
        }
      }
    }
    init();
  };
  useEffect(() => {
    predict();
  });
  return (
    <div>
      <canvas ref={canvasRef} />
      <img src={imgSrc} ref={imgRef} alt="capture img" />
      <button type="button" onClick={submitImg}>
        Submit
      </button>

      <button type="button" onClick={goBack}>
        back
      </button>
    </div>
  );
}
