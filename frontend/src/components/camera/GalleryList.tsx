import React, { useEffect, useState } from 'react';
import { getGalleryData, setGalleryData } from '../../api/galleryApi';

function GalleryList() {
  const [picture, setPicture] = useState<GalleryResult[] | null>([]);
  const [showImages, setShowImages] = useState<string[]>([]);
  const imgUrlLst: any = [];

  interface GalleryResult {
    picture: File;
  }

  const showImg = (e: any) => {
    e.preventDefault();
    const getPicture = async () => {
      const response = await getGalleryData();
      if (response) {
        setPicture(response.result);
      }
    };
    getPicture();
  };
  useEffect(() => {
    if (picture) {
      for (let i = 0; i < picture?.length; i += 1) {
        const currentImgUrl = picture[i];
        imgUrlLst.push(currentImgUrl);
      }

      setShowImages(imgUrlLst);
    }
  }, [picture]);
  return (
    <div>
      {/* {showImages.map((image, id) => (
        <div key={id}>
          <img src={image} alt={`${image}-${id}`} />
        </div>
      ))} */}
    </div>
  );
}

export default GalleryList;
