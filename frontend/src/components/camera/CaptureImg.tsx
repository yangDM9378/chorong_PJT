import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';

export default function CaptureImg() {
  const [showImages, setShowImages] = useState<string[]>([]);
  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  const Token =
    'eyJyZWdEYXRlIjoxNjc5NjQ0MDIxMjc2LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTm0iOiLslpHrj5nsnbQiLCJ1c2VySWQiOiJzc2FmeUBzc2FmeS5jb20iLCJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJleHAiOjE2Nzk2NDU4MjF9.0xtwCa-GI-Cp2zVDzuO98Sfq5hpgY9qxAN5HCgv9JWs';
  const culturalId = '1';

  const submitImg = (e: any) => {
    const formData = new FormData();
    const culturalPropertyId = {
      culturPropertyId: 1,
    };
    const payload = {
      culturalPropertyId: JSON.stringify(culturalPropertyId),
      picture: img,
    };
    formData.append('culturalPropertyId', culturalId);
    formData.append('picture', img!);
    console.log(payload);
    e.preventDefault();
    axios({
      method: 'post',
      url: `https://j8c101.p.ssafy.io/api/v1/galleries/`,
      data: {
        culturalPropertyId: 1,
        picture: img,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showImg = (e: any) => {
    e.preventDefault();
    axios({
      method: 'get',
      url: `https://j8c101.p.ssafy.io/api/v1/galleries/`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((result) => {
        console.log(result.data);
        const imgUrlLst = [];
        for (let i = 0; i < result.data.length; i += 1) {
          const currentImgUrl = URL.createObjectURL(result.data[i]);
          imgUrlLst.push(currentImgUrl);
        }
        setShowImages(imgUrlLst);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <button type="button" onClick={submitImg}>
        Submit
      </button>
      <button type="button" onClick={showImg}>
        showImg
      </button>
      {showImages.map((image, id) => (
        <div key={id}>
          <img src={image} alt={`${image}-${id}`} />
        </div>
      ))}
    </div>
  );
}
