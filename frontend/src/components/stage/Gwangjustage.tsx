/* eslint-disable */
// import React, { useState } from 'react';
import { MapContainer, GeoJSON, GeoJSONProps, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import gwangjugeojson from './Gwangju.json'; // 한국 지도 GeoJSON 데이터 파일
import { Feature, Geometry, GeoJsonObject } from 'geojson';
import L, { StyleFunction, Icon, LatLngTuple } from 'leaflet';
import { useNavigate } from 'react-router-dom';

interface RegionProperties {
  name: string;
}

const Gwangjustage: React.FC = () => {
  const navigate = useNavigate();

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

  const markers = [
    {
      name: '양',
      position: [35.14891073, 126.9330876] as LatLngTuple,
      imageUrl: '/stage/marker/ssafy.png',
    },
    {
      name: '동',
      position: [35.17, 126.86] as LatLngTuple,
      imageUrl: '/stage/marker/ssafy.png',
    },
    {
      name: '민',
      position: [35.18, 126.87] as LatLngTuple,
      imageUrl: '/stage/marker/ssafy.png',
    },
  ];

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
        {markers.map((marker, index) => {
          const customIcon = new Icon({
            iconUrl: marker.imageUrl,
            iconSize: [50, 50],
          });

          return (
            <Marker
              key={index}
              position={marker.position}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  navigate(`/culturalpropertydetail/${marker.name}`, {
                    // someParam: 'someValue',
                  });
                },
              }}
            />
          );
        })}
      </MapContainer>
      111
    </div>
  );
};

export default Gwangjustage;
