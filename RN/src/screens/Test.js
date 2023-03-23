import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CompassHeading from 'react-native-compass-heading';
import {
  ViroText,
  ViroFlexView,
  ViroNode,
  ViroARScene,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroImage
} from '@viro-community/react-viro';
// 거리 확인
const distanceBetweenPoints = (p1, p2) => {
  if (!p1 || !p2) {
      return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
  var dLon = (p2.longitude - p1.longitude) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.latitude * Math.PI / 180) * Math.cos(p2.latitude * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};



const Test = () => {
    const [location, setLocation] = useState(undefined);
    const [place, setPlace] = useState([{
      id: 1, 
      title: 'ssafy',
      lat: 35.205255,
      lng: 126.811731,
      icon: ''
    }])
    const [compassHeading, setCompassHeading] = useState(0)

    useEffect(() => {
      CompassHeading.start(3, (heading) => {
        setCompassHeading(heading);
      });
      
      PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      const _watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
          interval: 5000,
          fastestInterval: 2000,
        },
      );
  
      return () => {
        if (_watchId) {
          Geolocation.clearWatch(_watchId);
          CompassHeading.stop();

        }
      };


    }, []);

    const latLongToMerc = (latDeg,  longDeg) => {
      // From: https://gist.github.com/scaraveos/5409402 
      const longRad = (longDeg / 180.0) * Math.PI;
      const latRad = (latDeg / 180.0) * Math.PI;
      const smA = 6378137.0;
      const xmeters = smA * longRad;
      const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
      return { x: xmeters, y: ymeters };
    };

    const transformGpsToAR = (lat, lng) => {
      const isAndroid = Platform.OS === 'android'
      const latObj = lat
      const lngObj = lng
      const latMobile = location.latitude
      const lngMobile = location.longitude

      const deviceObjPoint = latLongToMerc(latObj, lngObj)
      const mobilePoint = latLongToMerc(latMobile, lngMobile)

      const objDeltaY = deviceObjPoint.y - mobilePoint.y;
      const objDeltaX = deviceObjPoint.x - mobilePoint.x;
      if (isAndroid) {
        let degree      = compassHeading.heading;
        let angleRadian = (degree * Math.PI) / 180;
        let newObjX     = objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
        let newObjY     = objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);
        return { x: newObjX, z: -newObjY };
      }

    }

    const placeARObjects = () => {
      const ARTargets = place.map((item) => {
      const coords = transformGpsToAR(item.lat, item.lng)
      const scale = Math.abs(Math.round(coords.z/15))
      const distance = distanceBetweenPoints(location, {latitude: item.lat, longitude: item.lng})

      return (
        <ViroNode key={item.id} scale={[1, 1, 1]} rotation={[0, 0, 0]} position={[coords.x, 0, coords.z]}>
          <ViroFlexView style={{alignItems: 'center', justifyContent: 'center'}}>
            <ViroText width={4} height={0.5} text={item.title} style={styles.helloWorldTextStyle} />
            <ViroText width={4} height={0.5} text={`${Number(distance).toFixed(2)} km`} style={styles.helloWorldTextStyle} position={[0, -0.75, 0]}/>
            <ViroImage width={1} height={1} source={require('./res/target.png')} position={[0,-1.5,0]}/>
          </ViroFlexView>
        </ViroNode>
      )
      })
      return ARTargets
    }

    function onInitialized(state, reason) {
      console.log('guncelleme', state, reason);
      if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
       console.log('success')
      } else if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
        // Handle loss of tracking
      }
    }

    return(
      <ViroARScene onTrackingUpdated={onInitialized} >
        {location 
        ? placeARObjects() 
        : ''}
      </ViroARScene>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
    },
  });
  

  export default () => {
    return (
      <ViroARSceneNavigator
      worldAlignment={'GravityAndHeading'}
        autofocus={true}
        initialScene={{
          scene: Test,
        }}
        style={styles.f1}
      />
    );
  };
