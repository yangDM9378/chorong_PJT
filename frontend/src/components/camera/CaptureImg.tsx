import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';

export default function CaptureImg() {
  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  const imgSrc = URL.createObjectURL(img!);
  const Token =
    'eyJyZWdEYXRlIjoxNjc5NjMyNjUyMTg5LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTm0iOiLslpHrj5nsnbQiLCJ1c2VySWQiOiJzc2FmeUBzc2FmeS5jb20iLCJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJleHAiOjE2Nzk2MzQ0NTJ9.7Da3XwR9lmCuSiA_4f6nx6xfFPNPTv7MI6RMmrSDhhk';
  const culturalId = '1';

  const submitImg = (e: any) => {
    const formData = new FormData();
    formData.append('culturalPropertyId', culturalId);
    formData.append('picture', img!);
    console.log(formData.get('culturalPropertyId'));
    e.preventDefault();
    axios({
      method: 'post',
      url: `https://j8c101.p.ssafy.io/api/v1/gallerys/`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((result) => {
        console.log(result);
        console.log('요청 성공');
      })
      .catch((error) => {
        console.log('요청 실패');
      });
  };

  console.log(img);
  const CaptureImgRef = useRef<HTMLImageElement | null>(null);
  return (
    <div>
      <img ref={CaptureImgRef} src={imgSrc} alt="capture img" />
      <button type="button" onClick={submitImg}>
        Submit
      </button>
    </div>
  );
}
