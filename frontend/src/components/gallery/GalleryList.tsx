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
      {photoList.map((photo, idx) => {
        // eslint-disable-next-line react/no-array-index-key
        return <GalleryItem photo={photo} key={idx} />;
      })}
      .
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${tw`grid	m-auto gap-2 grid-cols-3  overflow-auto	p-2`}
  `,
};
