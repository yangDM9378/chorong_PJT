import React from 'react';
import Camera from '../../components/camera/Camera';
import TeachableMachine from '../../components/camera/TeachableMachine';
import CameraComponent from '../../components/camera/CameraComponent';

export default function CameraPage() {
  return (
    <div>
      <Camera />
      <TeachableMachine />
      <CameraComponent />
    </div>
  );
}
