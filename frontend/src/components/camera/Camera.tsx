import React, { useRef, useEffect, useState } from 'react';

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState<boolean>(false);

  const setCamera = () => {
    setFront((prev) => !prev);
  };

  useEffect(() => {
    getVideo();
  }, [front]);

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: front ? 'user' : 'environment' },
      });
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.play();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <video ref={videoRef} />
      <button type="button" onClick={setCamera}>
        {front ? 'Front' : 'Rear'} camera
      </button>
    </div>
  );
}
