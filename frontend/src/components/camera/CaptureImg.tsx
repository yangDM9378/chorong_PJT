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
import Loading from '../common/Loading';

export default function CaptureImg() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(() => {
    navigate('/camera/');
  }, [navigate]);

  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  img!.arrayBuffer().then((arrayBuffer) => {
    const blob = new Blob([new Uint8Array(arrayBuffer)], { type: img!.type });
  });
  const imgSrc = URL.createObjectURL(img!);
  const imgRef = useRef<HTMLImageElement>(null);

  const { culturalId, poseName } = location.state;

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
    const URL = 'https://teachablemachine.withgoogle.com/models/dLnNLi8hl/';

    let model: tmPose.CustomPoseNet | null;
    let maxPredictions: number;

    async function init() {
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const { pose, posenetOutput } = await model.estimatePose(
        imgRef.current!,
        true,
      );
      const prediction = await model.predict(posenetOutput);
      if (!prediction) {
        return (
          <div>
            <span>Loading</span>
          </div>
        );
      }
      for (let i = 0; i < maxPredictions; i += 1) {
        if (prediction[i].className === poseName) {
          if (prediction[i].probability > 0) {
            setPoseCompleted(true);
            return (
              <S.Btn>
                <button type="button" onClick={submitImg}>
                  상세페이지
                </button>
              </S.Btn>
            );
          }
        }
      }
      return (
        <div>
          <img src={imgSrc} ref={imgRef} alt="capture img" />
          <div className="flex justify-center gap-10 m-5">
            {poseCompleted ? (
              <S.Btn>
                <button type="button" onClick={submitImg}>
                  상세페이지
                </button>
              </S.Btn>
            ) : (
              <S.Btn>
                <button type="button" onClick={goBack}>
                  다시 찍기
                </button>
              </S.Btn>
            )}
          </div>
        </div>
      );
    }
    init();
  };
  useEffect(() => {
    predict();
    console.log(poseCompleted);
  }, []);
  return (
    <div>
      <img src={imgSrc} ref={imgRef} alt="capture img" />
      <div className="flex justify-center gap-10 m-5">
        {poseCompleted ? (
          <S.Btn>
            <button type="button" onClick={submitImg}>
              상세페이지
            </button>
          </S.Btn>
        ) : (
          <S.Btn>
            <button type="button" onClick={goBack}>
              다시 찍기
            </button>
          </S.Btn>
        )}
      </div>
    </div>
  );
}
const S = {
  Btn: styled.button`
    ${tw`w-[45vw] h-[6vh] bg-[#5C1F1F] rounded-full text-white text-[2vh]`}
  `,
};
