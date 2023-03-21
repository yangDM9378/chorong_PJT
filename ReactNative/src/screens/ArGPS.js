import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const ArGPS = () => {
    const [location, setLocation] = useState(undefined);

    useEffect(() => {
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
          distanceFilter: 0,
          interval: 5000,
          fastestInterval: 2000,
        },
      );
  
      return () => {
        if (_watchId) {
          Geolocation.clearWatch(_watchId);
        }
      };
    }, []);

    return(
        <View style={styles.container}>
        {location ? (
          <>
            <Text> latitude: {location.latitude} </Text>
            <Text> longitude: {location.longitude} </Text>
          </>
        ) : (
          <></>
        )}
      </View>
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
  

export default ArGPS;