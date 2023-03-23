import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';

export default function CaptureImg() {
  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );

  const Token =
    'eyJyZWdEYXRlIjoxNjc5NTU3MTU0MDE2LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTm0iOiLslpHrj5nsnbQiLCJ1c2VySWQiOiJzc2FmeUBzc2FmeS5jb20iLCJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJleHAiOjE2Nzk1NTg5NTR9.EmHC7X_6CPzcyK7yO7UOwYFppozl66w2DoEgs7a0mBw';
  const culturalId = '1';

  const submitImg = (e: any) => {
    const formData = new FormData();
    formData.append('cultural_property_id', culturalId);
    formData.append('picture.jpg', img!);
    e.preventDefault();
    axios({
      method: 'post',
      url: `https://j8c101.p.ssafy.io/api/v1/gallery/`,
      data: {
        cultural_property_id: 1,
        picture: img,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  console.log(img);
  const CaptureImgRef = useRef<HTMLImageElement | null>(null);
  return (
    <div>
      <img ref={CaptureImgRef} src={img} alt="capture img" />
      <button type="button" onClick={submitImg}>
        Submit
      </button>
    </div>
  );
}
