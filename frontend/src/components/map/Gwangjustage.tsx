/* eslint-disable */
import { useState, useEffect } from 'react';
import { MapContainer, GeoJSON, GeoJSONProps, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import gwangjugeojson from './Gwangju.json'; // 한국 지도 GeoJSON 데이터 파일
import { Feature, Geometry, GeoJsonObject } from 'geojson';
import L, { StyleFunction, Icon, LatLngTuple } from 'leaflet';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getMapData } from '../../api/mapApi';

interface RegionProperties {
  name: string;
}

interface MapResult {
  culturalPropertyId: number;
  nameKo: string;
  latitude: number;
  longitude: number;
  pinImage: string;
}

export default function Gwangjustage() {
  // 데이터 가져오기
  const [mapDatas, setMapDatas] = useState<MapResult[] | null>([]);
  const location = useLocation();
  const { stageNum } = location.state;

  useEffect(() => {
    console.log(stageNum);
    if (stageNum === undefined) return;
    const getMapDatas = async () => {
      const response = await getMapData(stageNum);
      if (response) {
        setMapDatas(response.result);
      }
    };
    getMapDatas();
  }, [stageNum]);

  // 지역별 스타일 지정
  const regionStyle: StyleFunction<any> = (
    feature: Feature<Geometry, RegionProperties> | undefined,
  ) => {
    return {
      fillColor: 'white',
      weight: 0,
      opacity: 0,
      color: 'blue',
      fillOpacity: 1,
    };
  };

  // 마커 클릭시 페이지 이동 ->
  const navigate = useNavigate();
  return (
    <div>
      <MapContainer
        center={[35.16, 126.85]}
        zoom={10}
        minZoom={10}
        maxZoom={10}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        style={{ height: '60vh', width: '100vw' }}
      >
        <GeoJSON
          data={gwangjugeojson as unknown as GeoJsonObject}
          style={regionStyle}
        />
        {mapDatas?.map((mapData, index) => {
          const customIcon = new Icon({
            iconUrl: `/stage${mapData.pinImage}.png`,
            iconSize: [50, 50],
          });

          return (
            <Marker
              key={index}
              position={[mapData.latitude, mapData.longitude] as LatLngTuple}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  navigate(
                    `/culturalpropertydetail/${mapData.culturalPropertyId}`,
                  );
                },
              }}
            />
          );
        })}
      </MapContainer>
      111
    </div>
  );
}
