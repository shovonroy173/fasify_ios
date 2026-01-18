import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    let watchId;

    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          Geolocation.clearWatch(watchId); // Stop watching after getting location
        },
        error => console.error('WATCH ERROR:', error),
        {
          enableHighAccuracy: false,
          distanceFilter: 10,
          timeout: 20000,
          maximumAge: 10000,
        },
      );
    };

    getLocation();

    return () => {
      if (watchId != null) Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;
