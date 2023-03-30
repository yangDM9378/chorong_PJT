import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as tmPose from '@teachablemachine/pose';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { storage } from '../../api/firebase';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';
import { authApi } from '../../libs/axiosConfig';
import { setStar } from '../../api/quizApi';

export default function CaptureImg() {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = useCallback(() => {
    navigate('/camera');
  }, [navigate]);

  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  console.log(img);
  img!.arrayBuffer().then((arrayBuffer) => {
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: img!.type });
  });
  const imgSrc = URL.createObjectURL(img!);
  const imgRef = useRef<HTMLImageElement>(null);

  let { culturalId, poseId } = location.state;
  culturalId = 3;
  poseId = 0;
  console.log(location.state);

  const [poseCompleted, setPoseCompleted] = useState(false);

  const submitImg = async (e: any) => {
    e.preventDefault();
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
      const starData = {
        culturalPropertyId: culturalId,
        starType: 'pose',
      };
      await setStar(starData);
    }
    await navigate(`/culturalpropertydetail/${culturalId}`);
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

      async function predict2() {
        if (!model) return;

        const { pose, posenetOutput } = await model.estimatePose(
          imgRef.current!,
          true,
        );
        const prediction = await model.predict(posenetOutput);

        console.log(prediction[poseId].probability);
        // for (let i = 0; i < maxPredictions; i += 1) {
        //   const classPrediction = `${prediction[i].className}: ${prediction[
        //     i
        //   ].probability.toFixed(2)}`;
        // }
        if (prediction[poseId].probability > 0.9) {
          console.log(prediction[poseId].probability);
          setPoseCompleted(true);
        }
      }

      predict2();
    }
    init();
  };
  useEffect(() => {
    predict();
    console.log(poseCompleted);
  });
  return (
    <div>
      <img src={imgSrc} ref={imgRef} alt="capture img" />
      <div className="flex justify-center gap-10 m-5">
        <S.Btn>
          <button type="button" onClick={goBack}>
            다시 찍기
          </button>
        </S.Btn>

        {poseCompleted ? (
          <S.Btn>
            <button type="button" onClick={submitImg}>
              상세페이지
            </button>
          </S.Btn>
        ) : (
          <p />
        )}
      </div>
    </div>
  );
}
const S = {
  Btn: styled.button`
    ${tw`
    flex overflow-hidden m-1 p-1 border-double border-4 rounded px-8 py-1
    `}
  `,
};
