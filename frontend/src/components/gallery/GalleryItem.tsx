interface Photo {
  photo: string;
}

export default function GalleryItem({ photo }: Photo) {
  return <img src={photo} alt="갤러리 사진" />;
}
