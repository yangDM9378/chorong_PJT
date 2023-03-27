import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCulturalProperty } from '../../store/culturalproperty/slice';
import CulturalPropertyButtons from '../../components/culturalpropertydetail/CulturalPropertyButtons';
import CulturalPropertyDescription from '../../components/culturalpropertydetail/CulturalPropertyDescription';
import CulturalPropertyHeader from '../../components/culturalpropertydetail/CulturalPropertyHeader';
import { CulturalPropertyData } from '../../types/culturalpropertytype';
import { CulturalProperty } from '../../api/culturalpropertydetailApi';

export default function CulturalPropertyPage() {
  const { culturalpropertynum } = useParams<{ culturalpropertynum: string }>();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery<CulturalPropertyData, Error>(
    ['culturalProperty', culturalpropertynum],
    () => CulturalProperty(Number(culturalpropertynum)),
  );

  useEffect(() => {
    if (data) {
      dispatch(setCulturalProperty(data));
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
      <div>
        <button
          type="button"
          onClick={() => {
            console.log(data);
          }}
        >
          1111
        </button>
        <CulturalPropertyHeader />
        <CulturalPropertyDescription />
        <CulturalPropertyButtons />
      </div>
    );
  }
  return null;
}
