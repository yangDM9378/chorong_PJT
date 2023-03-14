/* eslint-disable consistent-return */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// interface Geojson {
//   type: string;
//   features: GeoFeature[];
// }

// interface GeoFeature {
//   type: string;
//   properties: any;
//   geometry: GeoGeometry;
// }

// interface GeoGeometry {
//   type: string;
//   coordinates: any;
// }

// export default function CategoryMap() {
//   const [koreaGeojson, setKoreaGeojson] = useState<Geojson | null>(null);

//   useEffect(() => {
//     async function fetchGeojson() {
//       const response = await fetch('/korea.json');
//       const data: Geojson = await response.json();
//       console.log(data);
//       setKoreaGeojson(data);
//     }
//     fetchGeojson();
//   }, []);

//   if (!koreaGeojson) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ComposableMap
//       projection="geoAzimuthalEqualArea"
//       projectionConfig={{
//         rotate: [0.0, -53.0, 0],
//         scale: 0,
//       }}
//     >
//       <Geographies geography={koreaGeojson.features}>
//         {({ geographies }) =>
//           geographies.map((geo) => {
//             return (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#FF5533"
//                 stroke="#000000"
//               />
//             );
//           })
//         }
//       </Geographies>
//     </ComposableMap>
//   );
// }

import { SimpleSouthKoreaMapChart } from 'react-simple-south-korea-map-chart';

const data = [
  { locale: '부산광역시', count: 1500 },
  { locale: '대구광역시', count: 3000 },
  { locale: '대전광역시', count: 400 },
  { locale: '강원도', count: 2500 },
  { locale: '광주광역시', count: 1000 },
  { locale: '경기도', count: 4000 },
  { locale: '인천광역시', count: 2200 },
  { locale: '제주특별자치도', count: 100 },
  { locale: '충청북도', count: 49 },
  { locale: '경상북도', count: 2000 },
  { locale: '전라북도', count: 3300 },
  { locale: '세종특별자치시', count: 110 },
  { locale: '충청남도', count: 10 },
  { locale: '경상남도', count: 0 },
  { locale: '전라남도', count: 250 },
  { locale: '울산광역시', count: 100 },
  { locale: '서울특별시', count: 10000 },
];

export default function CategoryMap() {
  const setColorByCount = (count: number) => {
    if (count === 0) return '#F1F1F1';
    if (count > 5000) return '#79D3C4';
    if (count > 3000) return '#43cdb6';
    if (count > 1000) return '#61CDBB';
    if (count > 200) return '#91D9CD';
    if (count > 100) return '#A9DFD6';
    if (count > 50) return '#C1E5DF';
    if (count > 5) return '#D9EBE8';
    if (count < 5) return '#ebfffd';
  };

  return (
    <SimpleSouthKoreaMapChart setColorByCount={setColorByCount} data={data} />
  );
}
