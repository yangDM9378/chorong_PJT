/* eslint-disable no-console */
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { setarStar } from '../../api/arApi';

export default function ArPage() {
  const navigate = useNavigate();
  const goCulturalPropertyDetail = useCallback(() => {
    navigate(
      `/culturalpropertydetail/${localStorage.getItem('culturalPropertyId')}`,
    );
  }, [navigate]);

  useEffect(() => {
    const setStar = async () => {
      try {
        const starData = {
          culturalPropertyId: Number(
            localStorage.getItem('culturalPropertyId'),
          ),
          starType: 'ar',
        };
        await setarStar(starData);
        await goCulturalPropertyDetail();
      } catch (error) {
        console.error(error);
      }
    };

    setStar();
  }, [goCulturalPropertyDetail]);

  return <div>loading</div>;
}
