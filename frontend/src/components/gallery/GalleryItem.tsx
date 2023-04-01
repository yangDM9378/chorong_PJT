import styled from 'styled-components';
import tw from 'twin.macro';

interface Photo {
  photo: string;
}

export default function GalleryItem({ photo }: Photo) {
  return <S.Card src={photo} alt="갤러리 사진" />;
}

const S = {
  Card: styled.img`
    ${tw`flex rounded-[2.5vh] max-w-[50%] p-1 h-[35vw]`}
  `,
};
