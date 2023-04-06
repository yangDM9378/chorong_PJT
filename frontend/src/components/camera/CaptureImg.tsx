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
  const imgSrc = img ? URL.createObjectURL(img) : '';
  const imgRef = useRef<HTMLImageElement>(null);

  const { culturalId, poseName } = location.state;

  const [poseCompleted, setPoseCompleted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const URL = 'https://teachablemachine.withgoogle.com/models/dLnNLi8hl/';

    let model: tmPose.CustomPoseNet | null;
    let maxPredictions: number;

    async function init() {
      if (!img) {
        return;
      }

      setIsLoading(true); // 로딩 상태 설정

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
        setShowButton(true);
      } else {
        for (let i = 0; i < maxPredictions; i += 1) {
          if (
            prediction[i].className === poseName &&
            prediction[i].probability > 0
          ) {
            setPoseCompleted(true);
            setShowButton(true);
            break;
          } else {
            setShowButton(true);
          }
        }
      }

      setIsLoading(false); // 로딩 상태 해제
    }

    init();
  }, [img, poseName]);

  return (
    <div>
      <img src={imgSrc} ref={imgRef} alt="capture img" />
      <div className="flex justify-center gap-10 m-5">
        {isLoading ? (
          <Loading /> // 로딩 컴포넌트 렌더링
        ) : (
          showButton && (
            <S.Btn type="button" onClick={poseCompleted ? submitImg : goBack}>
              {poseCompleted ? '상세페이지' : '다시 찍기'}
            </S.Btn>
          )
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
