import React from 'react';
import Camera from '../../components/camera/Camera';
import TeachableMachine from '../../components/camera/TeachableMachine';
import VideoPoseModel from '../../components/camera/VideoPoseModel';

export default function CameraPage() {
  return (
    <div>
      <VideoPoseModel />
      <TeachableMachine />
    </div>
  );
}
