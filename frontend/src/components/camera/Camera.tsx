/* eslint-disable jsx-a11y/media-has-caption */
import styled from 'styled-components';
import tw from 'twin.macro';

import React, { useRef, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { useDispatch, useSelector } from 'react-redux';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import { setImg } from '../../store/camera/slice';
import { CulturalPropertyState } from '../../store/culturalproperty/slice';
import { AppState } from '../../store';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState<boolean>(false);
  const [imageCapture, setImageCapture] = useState<ImageCapture>();
  const value = useSelector<AppState, CulturalPropertyState['value']>(
    (state) => state.culturalProperty.value,
  );
  const pose = value?.result.culturalProperty.pose;
  const cultural = value?.result.culturalProperty;
  const dispatch = useDispatch();
  const setCamera = () => {
    setFront((prev) => !prev);
  };
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const handleClose = () => {
    setModalIsOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    getVideo();
  }, [front]);
  function onTakePhotoButtonClick() {
    console.log('onTakePhotoBUttonclick');
    imageCapture
      ?.takePhoto()
      .then((blob: any) => {
        createImageBitmap(blob);
        // const file = new File([blob], 'test2.jpg');
        dispatch(setImg(blob));

        navigate('/camera/after', {
          state: {
            culturalId: cultural?.culturalPropertyId,
            poseId: pose?.poseId,
          },
        });
      })
      .catch((error: Error) => console.error(error));
  }

  const getVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: front ? 'user' : 'environment',
          width: 720,
          height: 480,
        },
      })
      .then(function (stream) {
        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const track = stream.getVideoTracks()[0];
        setImageCapture(new ImageCapture(track));
      })
      .catch(function (err) {
        console.log(`An error occurred: ${err}`);
      });
  };
  return (
    <div>
      <video ref={videoRef} />
      <CachedIcon onClick={setCamera} />

      <CameraRoundedIcon onClick={onTakePhotoButtonClick} />
      <InfoOutlinedIcon
        onClick={() => {
          setModalIsOpen(true);
        }}
      />
      {modalIsOpen && (
        <ReactModal isOpen={modalIsOpen} onRequestClose={handleClose}>
          <img src={pose?.posePicture} alt={pose?.poseName} />
        </ReactModal>
      )}
    </div>
  );
}

const S = {
  VideoContainer: styled.div`
    ${tw` h-[80vh] flex-col items-center justify-center`}
  `,
};
// import React from 'react';

// export default function Camera() {
//   return <div>Camera</div>;
// }
