/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import tw from 'twin.macro';
import React from 'react';

type Props = {
  starCnt: number;
};

export default function CulturalPropertyStar(props: Props) {
  const { starCnt } = props;

  // 각 starCnt에 맞는 이미지 배열
  const starImages = [
    ['/star/star_false.png', '/star/star_false.png', '/star/star_false.png'],
    ['/star/star_true.png', '/star/star_false.png', '/star/star_false.png'],
    ['/star/star_true.png', '/star/star_true.png', '/star/star_false.png'],
    ['/star/star_true.png', '/star/star_true.png', '/star/star_true.png'],
  ];

  // starCnt에 맞는 이미지 배열 선택
  const images = starImages[Math.min(starCnt, 3)];

  return (
    <S.Star>
      {images.map((src, index) => (
        <img key={index} src={src} alt={src} />
      ))}
    </S.Star>
  );
}
const S = {
  Star: styled.div`
    ${tw`flex justify-end p-[2vh]`}
  `,
};
