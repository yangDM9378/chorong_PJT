/* eslint-disable */
import React, { useState } from 'react';
import { MapContainer, GeoJSON, GeoJSONProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import koreaGeoJSON from './korea.json'; // 한국 지도 GeoJSON 데이터 파일
import { Feature, Geometry, GeoJsonObject } from 'geojson';
import L, { StyleFunction } from 'leaflet';

interface RegionProperties {
  name: string;
}

const CategoryMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleRegionClick: GeoJSONProps['onEachFeature'] = (feature, layer) => {
    const regionName = feature.properties.name;

    layer.on('click', (event) => {
      setSelectedRegion(regionName);
      // console.log('선택된 지역:', regionName);
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
    서울특별시: { value: 100, color: 'yellow' },
  };

  const getColorByValue = (regionName: string): string => {
    const regionInfo = regionData[regionName];
    console.log(regionInfo);
    if (!regionInfo) return 'gray'; // Change to a default color if region data is not available
    return regionInfo.color;
  };

  const regionStyle: StyleFunction<any> = (
    feature: Feature<Geometry, RegionProperties> | undefined,
  ) => {
    const regionName = feature?.properties.name;
    const regionColor = getColorByValue(regionName!); // add non-null assertion operator

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

export default CategoryMap;
