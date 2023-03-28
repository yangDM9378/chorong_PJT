import React from 'react';
// import Camera from '../../components/camera/Camera';
import TMHtml from '../../components/camera/TMHtml';
// import TeachableMachine from '../../components/camera/TeachableMachine';
// import VideoPoseModel from '../../components/camera/VideoPoseModel';

export default function CameraPage() {
  return (
    <div>
      {/* <Camera /> */}
      <TMHtml />
      {/* <VideoPoseModel /> 로딩은 비교적 짧으나 prediction에 오래걸림 */}
      {/* <TeachableMachine /> 로딩 시간 개 오래걸림 */}
    </div>
  );
}
