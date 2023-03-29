/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { useDispatch, useSelector } from 'react-redux';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { setImg } from '../../store/camera/slice';
import { CulturalPropertyState } from '../../store/culturalproperty/slice';
import { AppState } from '../../store';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState<boolean>(false);
  let imageCapture: any;
  const value = useSelector<AppState, CulturalPropertyState['value']>(
    (state) => state.culturalProperty.value,
  );
  const pose = value?.result.culturalProperty.pose;
  const dispatch = useDispatch();
  const setCamera = () => {
    setFront((prev) => !prev);
  };
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const handleClose = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    getVideo();
  }, [front]);
  function onTakePhotoButtonClick() {
    if (!imageCapture) return;
    imageCapture
      .takePhoto()
      .then((blob: any) => {
        createImageBitmap(blob);
        // const file = new File([blob], 'test2.jpg');
        dispatch(setImg(blob));
      })
      .catch((error: Error) => console.error(error));
  }
  const getVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: front ? 'user' : 'environment',
        },
      })
      .then(function (stream) {
        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const track = stream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
      })
      .catch(function (err) {
        console.log(`An error occurred: ${err}`);
      });
  };
  return (
    <div>
      <video ref={videoRef} />
      <button type="button" onClick={setCamera}>
        {front ? 'Front' : 'Rear'} camera
      </button>
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
      <button type="button">
        <Link to="/camera/after">after</Link>
      </button>
    </div>
  );
}

// import React from 'react';

// export default function Camera() {
//   return <div>Camera</div>;
// }
