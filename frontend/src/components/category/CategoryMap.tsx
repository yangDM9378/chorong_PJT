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
//       setKoreaGeojson(data);
//     }
//     fetchGeojson();
//   }, []);

//   if (!koreaGeojson) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <ComposableMap
//       projection="geoMercator"
//       projectionConfig={{
//         scale: 4500,
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

import './styles.css';
import { DataMapsWrapper } from 'react-typescript-datamaps';
import d3 from 'd3';

const demoProps = {
  scope: 'india',
  geographyConfig: {
    popupOnHover: true,
    highlightOnHover: true,
    borderColor: '#444',
    borderWidth: 0.5,
    dataUrl:
      'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json',
  },
  bubblesConfig: {
    borderWidth: 2,
    borderOpacity: 1,
    borderColor: '#FFFFFF',
    popupOnHover: true, // True to show the popup while hovering
    radius: null,
    popupTemplate: function (geo, data) {
      return `<div class="hoverinfo">city: ${data.state}, Slums: ${data.radius}%</div>`;
    },
    fillOpacity: 0.75,
    animate: true,
    highlightOnHover: true,
    highlightFillColor: '#FC8D59',
    highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
    highlightBorderWidth: 2,
    highlightBorderOpacity: 1,
    highlightFillOpacity: 0.85,
    exitDelay: 100, // Milliseconds
    key: JSON.stringify,
  },
  fills: {
    MAJOR: '#306596',
    MEDIUM: '#0fa0fa',
    MINOR: '#bada55',
    defaultFill: '#dddddd',
  },
  data: {
    JH: { fillKey: 'MINOR' },
    MH: { fillKey: 'MINOR' },
  },
  setProjection: function (element) {
    var projection = d3.geo
      .mercator()
      .center([80, 25])
      .scale(600)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    var path = d3.geo.path().projection(projection);
    return { path: path, projection: projection };
  },
};

const bubblesDemo = [
  {
    centered: 'MH',
    fillKey: 'MAJOR',
    radius: 20,
    state: 'Maharastra',
  },
  {
    centered: 'AP',
    fillKey: 'MAJOR',
    radius: 22,
    state: 'Andhra Pradesh',
  },
  {
    centered: 'TN',
    fillKey: 'MAJOR',
    radius: 16,
    state: 'Tamil Nadu',
  },
  {
    centered: 'WB',
    fillKey: 'MEDIUM',
    radius: 15,
    state: 'West Bengal',
  },
  {
    centered: 'MP',
    fillKey: 'MEDIUM',
    radius: 15,
    state: 'Madhya Pradesh',
  },
  {
    centered: 'UP',
    fillKey: 'MINOR',
    radius: 8,
    state: 'Uttar Pradesh',
  },
  {
    centered: 'RJ',
    fillKey: 'MINOR',
    radius: 7,
    state: 'Rajasthan',
  },
];

function Demo() {
  const [bubbles, setBubbles] = React.useState([]);
  React.useEffect(() => {
    setInterval(() => {
      setBubbles(bubblesDemo);
    }, 1000);
  }, []);
  return (
    <div style={{ width: '600px', height: '600px' }} className="App">
      <DataMapsWrapper {...demoProps} bubbles={bubbles} />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Demo />
      </div>
    </div>
  );
}
