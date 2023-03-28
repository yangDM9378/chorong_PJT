import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../api/firebase';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';
import { getGalleryData, setGalleryData } from '../../api/galleryApi';
import { authApi } from '../../libs/axiosConfig';

interface GalleryResult {
  picture: File;
}

export default function CaptureImg() {
  const [picture, setPicture] = useState<GalleryResult[] | null>([]);
  const [showImages, setShowImages] = useState<string[]>([]);
  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  const Token = localStorage.getItem('accessToken');
  const culturalId = '1';

  const imgUrlLst: any = [];

  useEffect(() => {
    if (picture) {
      for (let i = 0; i < picture?.length; i += 1) {
        const currentImgUrl = `picture[i]`;
        imgUrlLst.push(currentImgUrl);
      }

      setShowImages(imgUrlLst);
    }
  }, [picture]);

  const submitImg = async (e: any) => {
    e.preventDefault();

    if (img !== undefined) {
      const storageRef = ref(storage, `files/${uuidv4()}`);
      const uploadTask = uploadBytes(storageRef, img);
      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const payload = {
              culturalPropertyId: 1,
              picture: downloadURL,
            };
          authApi.post('/galleries', payload).then((result) => {
            console.log(result)
          }).catch((err) => {
            console.log(err)
          });
        });
      });
    }
    // const culturalPropertyId = {
    //   culturPropertyId: 1,
    // };
    // const payload = {
    //   culturalPropertyId: 1,
    //   picture: img,
    // };
    // console.log(payload);
    // axios({
    //   method: 'post',
    //   url: `https://j8c101.p.ssafy.io/api/v1/galleries/`,
    //   data: payload,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${Token}`,
    //   },
    // })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const showImg = (e: any) => {
    e.preventDefault();
    const getPicture = async () => {
      const response = await getGalleryData();
      console.log(response);
      if (response) {
        setPicture(response.result);
      }
    };
    getPicture();
  };
  let tmp: string;
  if (picture) {
    tmp = `file://home/ubuntu/upload/gallery/${picture[1]}`;
    console.log(tmp);
  }
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
