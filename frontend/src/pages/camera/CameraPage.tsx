import React from 'react';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { useNavigate } from 'react-router-dom';
import Camera from '../../components/camera/Camera';
// import TMHtml from '../../components/camera/TMHtml';
// import TeachableMachine from '../../components/camera/TeachableMachine';
// import VideoPoseModel from '../../components/camera/VideoPoseModel';

export default function CameraPage() {
  const navigate = useNavigate();
  const goCulturalpropertydetail = () => {
    navigate(
      `/culturalpropertydetail/${localStorage.getItem('culturalPropertyId')}`,
    );
  };
  return (
    <div>
      <IoIosArrowBack
        className="absolute w-[5vh] h-[5vh] z-10"
        style={{ top: '2vh', left: '4vw', color: '#ffcdf3' }}
        onClick={goCulturalpropertydetail}
      />
      <Camera />
      {/* <TMHtml /> */}
      {/* <VideoPoseModel /> */}
      {/* 로딩은 비교적 짧으나 prediction에 오래걸림 */}
      {/* <TeachableMachine /> */}
      {/* 로딩 시간 개 오래걸림 */}
    </div>
  );
}
