import React from 'react';
import GalleryList from '../../components/gallery/GalleryList';

export default function GalleryPage() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="h-[25%]">갤러리 헤더</div>
      <GalleryList />
    </div>
  );
}
