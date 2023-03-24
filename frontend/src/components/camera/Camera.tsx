/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import { Link } from 'react-router-dom';
import { setImg } from '../../store/camera/slice';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState<boolean>(false);
  let imageCapture: any;
  const dispatch = useDispatch();

  const setCamera = () => {
    setFront((prev) => !prev);
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
        const file = new File([blob], 'test.jpg');
        dispatch(setImg(file));
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
