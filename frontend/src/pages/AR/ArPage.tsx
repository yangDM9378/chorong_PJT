/* eslint-disable no-console */
import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setarStar } from '../../api/arApi';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';

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
        console.log(starData);
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
