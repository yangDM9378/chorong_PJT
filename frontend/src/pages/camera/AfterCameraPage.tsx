import React from 'react';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { useNavigate } from 'react-router-dom';
import CaptureImg from '../../components/camera/CaptureImg';

export default function AfterCameraPage() {
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
      <CaptureImg />
    </div>
  );
}
