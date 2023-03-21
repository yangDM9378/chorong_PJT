import React, { useState, useEffect, useRef } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  SlideRenderProps,
  SlideRendererCallback,
  autoPlay,
  virtualize,
} from 'react-swipeable-views-utils';

interface ImageProps {
  url: string;
}

const images: ImageProps[] = [
  { url: 'https://placeimg.com/640/480/any' },
  { url: 'https://placeimg.com/640/480/animals' },
  { url: 'https://placeimg.com/640/480/architecture' },
  { url: 'https://placeimg.com/640/480/people' },
  { url: 'https://placeimg.com/640/480/nature' },
];

const AutoplaySwipeableViews = autoPlay(SwipeableViews);
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

interface CardProps {
  image: ImageProps;
  index: number;
  onClick: (index: number) => void;
}

function Card({ image, index, onClick }: CardProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      style={{
        backgroundImage: `url(${image.url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '10px',
        cursor: 'pointer',
        height: '240px',
        width: '320px',
      }}
    >
      button
    </button>
  );
}

function HomeCarousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [virtualIndex, setVirtualIndex] = useState(0);
  const autoPlayTimeout = useRef<NodeJS.Timeout | null>(null);

  function handleCardClick(index: number) {
    setCurrentIndex(index);
  }

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
  }: SlideRenderProps) => (
    <Card
      image={images[index]}
      key={index}
      index={index}
      onClick={handleCardClick}
    />
  );

  return (
    <VirtualizeSwipeableViews
      index={virtualIndex}
      onChangeIndex={handleVirtualIndexChange}
      slideCount={images.length}
      slideRenderer={slideRenderer}
    />
  );
}

export default HomeCarousel;
