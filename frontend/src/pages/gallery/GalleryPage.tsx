import React from 'react';
import Header from '../../components/common/profile/Header';
import GalleryList from '../../components/gallery/GalleryList';

export default function GalleryPage() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Header />
      <GalleryList />
    </div>
  );
}
