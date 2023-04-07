/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  SlideRenderProps,
  SlideRendererCallback,
  virtualize,
} from 'react-swipeable-views-utils';

interface ImageProps {
  url: string;
}

const images: ImageProps[] = [
  { url: '/carousel/1.jpg' },
  { url: 'https://placeimg.com/640/480/animals' },
  { url: 'https://placeimg.com/640/480/architecture' },
  { url: 'https://placeimg.com/640/480/people' },
  { url: 'https://placeimg.com/640/480/nature' },
];

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

interface CardProps {
  image: ImageProps;
}

function Card({ image }: CardProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <div>초롱따라</div>
    </div>
  );
}

export default function HomeCarousel() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const autoPlayTimeout = useRef<NodeJS.Timeout | null>(null);

  function handleVirtualIndexChange(index: number) {
    setVirtualIndex(index);
  }

  useEffect(() => {
    autoPlayTimeout.current = setInterval(() => {
      setVirtualIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      if (autoPlayTimeout.current) {
        clearInterval(autoPlayTimeout.current);
      }
    };
  }, []);

  const slideRenderer: SlideRendererCallback = ({
    index,
  }: SlideRenderProps) => <Card image={images[index]} key={index} />;

  // componentDidUpdate() 함수로 변경
  useEffect(() => {
    if (virtualIndex !== images.length - 1) {
      return;
    }

    autoPlayTimeout.current = setInterval(() => {
      setVirtualIndex(0);
    }, 1000000);

    return () => {
      if (autoPlayTimeout.current) {
        clearInterval(autoPlayTimeout.current);
      }
    };
  }, []);

  return (
    <VirtualizeSwipeableViews
      index={virtualIndex}
      onChangeIndex={handleVirtualIndexChange}
      slideCount={images.length}
      slideRenderer={slideRenderer}
    />
  );
}
