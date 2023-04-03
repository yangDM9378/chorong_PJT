import styled from 'styled-components';
import tw from 'twin.macro';
import { useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCulturalProperty } from '../../store/culturalproperty/slice';
import CulturalPropertyButtons from '../../components/culturalpropertydetail/CulturalPropertyButtons';
import CulturalPropertyDescription from '../../components/culturalpropertydetail/CulturalPropertyDescription';
import CulturalPropertyHeader from '../../components/culturalpropertydetail/CulturalPropertyHeader';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import { CulturalProperty } from '../../api/culturalpropertydetailApi';

interface Coords {
  latitude: number | undefined;
  longitude: number | undefined;
}

// interface Props {
//   coords: Coords;
// }

export default function CulturalPropertyPage() {
  // 현재 gps 가져오기
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchPosition: true,
    });
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
        <CulturalPropertyHeader
          coords={coords ?? { latitude: undefined, longitude: undefined }}
        />
        <CulturalPropertyDescription />
        <CulturalPropertyButtons
          coords={coords ?? { latitude: undefined, longitude: undefined }}
        />
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
