/* eslint-disable */
import React, { useState } from 'react';
import { MapContainer, GeoJSON, GeoJSONProps, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import koreaGeoJSON from './korea.json'; // 한국 지도 GeoJSON 데이터 파일
import { Feature, Geometry, GeoJsonObject } from 'geojson';
import L, { StyleFunction } from 'leaflet';
import { useNavigate } from 'react-router-dom';

interface RegionProperties {
  name: string;
}

const SsafyStage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const navigate = useNavigate();

  const handleRegionClick: GeoJSONProps['onEachFeature'] = (feature, layer) => {
    const regionName = feature.properties.name;

    layer.on('click', (event) => {
      setSelectedRegion(regionName);
      navigate(`/categoryregion/${regionName}`);
    });

    if (layer instanceof L.Polygon) {
      const regionCenter = layer.getBounds().getCenter();
      // console.log(regionCenter);
      const tooltip = new L.Tooltip({
        permanent: true,
        direction: 'center',
      }).setContent(regionName);
      layer.bindTooltip(tooltip).openTooltip(regionCenter);
    }
  };

  const regionData: { [key: string]: { value: number; color: string } } = {
    부산광역시: { value: 70, color: 'orange' },
    대구광역시: { value: 40, color: 'yellow' },
    서울특별시: { value: 100, color: 'red' },
    인천광역시: { value: 80, color: 'blue' },
    광주광역시: { value: 60, color: 'green' },
    대전광역시: { value: 50, color: 'purple' },
    울산광역시: { value: 30, color: 'cyan' },
    세종특별자치시: { value: 20, color: 'magenta' },
    경기도: { value: 90, color: 'brown' },
    강원도: { value: 10, color: 'lime' },
    충청북도: { value: 55, color: 'pink' },
  };

  const getColorByValue = (regionName: string): string => {
    const regionInfo = regionData[regionName];
    console.log(regionInfo);
    if (!regionInfo) return 'gray';
    return regionInfo.color;
  };

  const regionStyle: StyleFunction<any> = (
    feature: Feature<Geometry, RegionProperties> | undefined,
  ) => {
    const regionName = feature?.properties.name;
    const regionColor = getColorByValue(regionName!);

    return {
      fillColor: regionColor,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.4,
    };
  };

  return (
    <div>
      <MapContainer
        center={[36.0, 127.8]}
        zoom={6.8}
        minZoom={6.8}
        maxZoom={6.8}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        style={{ height: '85vh', width: '80vw' }}
      >
        <GeoJSON
          data={koreaGeoJSON as unknown as GeoJsonObject}
          onEachFeature={handleRegionClick}
          style={regionStyle}
        />
      </MapContainer>
      {selectedRegion && <p>선택된 지역: {selectedRegion}</p>}
    </div>
  );
};

export default SsafyStage;
