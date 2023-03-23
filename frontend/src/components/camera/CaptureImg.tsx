import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { CameraState } from '../../store/camera/slice';

export default function CaptureImg() {
  const img = useSelector<AppState, CameraState['img']>(
    (state) => state.camera.img,
  );
  console.log(img);
  const CaptureImgRef = useRef<HTMLImageElement | null>(null);
  return (
    <div>
      {img}
      <img ref={CaptureImgRef} src={img} alt="capture img" />
    </div>
  );
}
