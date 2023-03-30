import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getGalleryDetailData } from '../../api/galleryApi';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import CulturalPropertyPhotoCard from './CulturalPropertyPhotoCard';

interface TabNo {
  tabNumber: number;
}

export default function CulturalPorpertyGallary({ tabNumber }: TabNo) {
  const [photos, setPohtos] = useState([]);
  // 갤러리 탭을 누르면 사진을 호출합니다.
  useEffect(() => {
    if (tabNumber === 3) {
      showGallery();
    }
  }, [tabNumber]);
  const culturalPropertydata = useSelector<
    AppState,
    CulturalPropertyData | null
  >(({ culturalProperty }) => culturalProperty.value);
  const culturalPropertyNo =
    culturalPropertydata?.result.culturalProperty.culturalPropertyId;
  const showGallery = async () => {
    const response = await getGalleryDetailData(culturalPropertyNo);
    if (response) {
      // 사진 데이터 최신순 정렬
      setPohtos(response.result.reverse());
    }
  };

  return (
    <div>
      <S.Container>
        {photos.map((photo, i: number) => {
          // eslint-disable-next-line react/no-array-index-key
          return <CulturalPropertyPhotoCard key={i} photo={photo} />;
        })}
      </S.Container>
    </div>
  );
}

const S = {
  Container: styled.div`
    ${tw`grid w-[90%]	m-auto gap-1 grid-cols-2 h-[50vh] overflow-auto	`}
  `,
};
