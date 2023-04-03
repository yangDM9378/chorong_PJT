import styled from 'styled-components';
import tw from 'twin.macro';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGeolocated } from 'react-geolocated';
import { setCulturalProperty } from '../../store/culturalproperty/slice';
import CulturalPropertyButtons from '../../components/culturalpropertydetail/CulturalPropertyButtons';
import CulturalPropertyDescription from '../../components/culturalpropertydetail/CulturalPropertyDescription';
import CulturalPropertyHeader from '../../components/culturalpropertydetail/CulturalPropertyHeader';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import { CulturalProperty } from '../../api/culturalpropertydetailApi';

export default function CulturalPropertyPage() {
  // gps 위치 판별
  const [isTrue, setIsTrue] = useState(false);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchPosition: true,
    });

  function distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // 두 지점 간의 거리 (단위: km)
    return d * 1000; // 미터로 변환
  }

  function isWithin500m(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): boolean {
    const d = distance(lat1, lon1, lat2, lon2);
    setIsTrue(d <= 50);
    return d <= 50;
  }

  useEffect(() => {
    if (coords && data) {
      isWithin500m(
        coords?.latitude,
        coords?.longitude,
        data?.result.culturalProperty.latitude,
        data?.result.culturalProperty.longitude,
      );
      alert(coords.latitude);
    }
  }, [coords]);

  const queryClient = useQueryClient();

  const { culturalpropertynum } = useParams<{ culturalpropertynum: string }>();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery<CulturalPropertyData, Error>(
    ['culturalProperty', culturalpropertynum],
    () => CulturalProperty(Number(culturalpropertynum)),
  );
  queryClient.invalidateQueries({ queryKey: ['culturalProperty'] });

  useEffect(() => {
    if (data) {
      dispatch(setCulturalProperty(data));
      localStorage.setItem(
        'culturalPropertyId',
        data.result.culturalProperty.culturalPropertyId.toString(),
      );
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  if (data) {
    return (
      <S.Container>
        <CulturalPropertyHeader isTrue={isTrue} />
        <CulturalPropertyDescription />
        <CulturalPropertyButtons isTrue={isTrue} />
      </S.Container>
    );
  }
  return null;
}

const S = {
  Container: styled.div`
    ${tw`w-[100vw] h-[100vh] bg-maingray`}
  `,
};
