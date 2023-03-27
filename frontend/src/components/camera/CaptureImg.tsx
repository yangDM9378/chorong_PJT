import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';
import { getGalleryData } from '../../api/galleryApi';

export default function CaptureImg() {
  const [picture, setPicture] = useState<File[] | null>([]);
  const [showImages, setShowImages] = useState<string[]>([]);
  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  const Token = localStorage.getItem('accessToken');
  const culturalId = '1';

  const imgUrlLst = [];

  useEffect(() => {
    if (picture) {
      for (let i = 0; i < picture?.length; i += 1) {
        // console.log(typeof picture[i]);
        // const currentImgUrl = URL.createObjectURL(picture[i]);
        // // console.log(currentImgUrl);
        // imgUrlLst.push(currentImgUrl);
      }

      // setShowImages(imgUrlLst);
    }
  }, [picture]);

  const submitImg = (e: any) => {
    const formData = new FormData();
    const culturalPropertyId = {
      culturPropertyId: 1,
    };
    const payload = {
      culturalPropertyId: JSON.stringify(culturalPropertyId),
      picture: img,
    };
  };

  const showImg = (e: any) => {
    e.preventDefault();
    const getPicture = async () => {
      const response = await getGalleryData();
      console.log(response);
      if (response) {
        // setPicture(response.result);
      }
    };
    getPicture();
  };

  return (
    <div>
      <button type="button" onClick={submitImg}>
        Submit
      </button>
      <button type="button" onClick={showImg}>
        showImg
      </button>
      {/* {showImages.map((image, id) => (
        <div key={id}>
          <img src={image} alt={`${image}-${id}`} />
        </div>
      ))} */}
    </div>
  );
}
