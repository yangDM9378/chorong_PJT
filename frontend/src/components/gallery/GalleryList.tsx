import { div } from '@tensorflow/tfjs-core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getGalleryData } from '../../api/galleryApi';
import GalleryItem from './GalleryItem';

export default function GalleryList() {
  const [photoList, setPhotoList] = useState([]);
  const getPhotoList = async () => {
    const response = await getGalleryData();
    if (response) {
      setPhotoList(response.result.reverse());
    }
  };
  useEffect(() => {
    getPhotoList();
  }, []);

  return (
    <S.Container>
      {photoList.length > 0 ? (
        photoList.map((photo, idx) => {
          // eslint-disable-next-line react/no-array-index-key
          return <GalleryItem photo={photo} key={idx} />;
        })
      ) : (
        <div className="text-center w-[100vw]">사진이 없습니다.</div>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`h-[64%] flex flex-wrap overflow-auto	p-3`}
  `,
};
