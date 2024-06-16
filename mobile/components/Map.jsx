import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";
import SyncStorage from "sync-storage";

const Map = ({ people }) => {
  const [coordinates, setCoordinates] = useState(null);

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const deltaLat = toRad(coords2.latitude - coords1.latitude);
    const deltaLon = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const startBackgroundTracking = async () => {
    const res = await Location.requestForegroundPermissionsAsync();
    if (res.status === "granted") {
      const data = await Location.getCurrentPositionAsync();
      setCoordinates({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
      SyncStorage.set("lat", coordinates.latitude.toString());
      SyncStorage.set("lng", coordinates.longitude.toString());
    }
  };

  const data = SyncStorage.init();

  useEffect(() => {
    startBackgroundTracking();
    const latitude = SyncStorage.get("lat");
    const longitude = SyncStorage.get("lng");
    console.log(latitude, longitude);
    if (latitude && longitude) {
      setCoordinates({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
    }
  }, []);

  return (
    <View style={tw`flex flex-col justify-center items-center w-full gap-2`}>
      {coordinates ? (
        <>
          <Text>Latitude: {coordinates.latitude}</Text>
          <Text>Longitude: {coordinates.longitude}</Text>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Circle
              center={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
              radius={100}
              fillColor="#A4DFFA"
              strokeColor="transparent"
              zIndex={100}
            />
            {people.map((marker, index) => {
              const distance = haversineDistance(
                {
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                },
                marker.coordinates
              );
              const isWithinRadius = distance <= 100;
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.title}
                  description={marker.description}
                >
                  <View>
                    <Image
                      source={{ uri: marker.image }}
                      style={[
                        styles.markerImage,
                        isWithinRadius && styles.withinRadiusImage,
                      ]}
                    />
                    <Image
                      source={{
                        uri: "https://icon-library.com/images/check-in-icon/check-in-icon-8.jpg",
                      }}
                      style={[styles.pinImage]}
                    />
                  </View>
                </Marker>
              );
            })}
          </MapView>
        </>
      ) : (
        <Button
          onPress={startBackgroundTracking}
          color="green"
          title="Enable Location"
        />
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5, // Adjust the height as needed
  },
  markerImage: {
    width: 45,
    height: 45,
    borderRadius: 25, // Optional: To make the image circular
    zIndex: 10,
  },
  pinImage: {
    position: "relative",
    bottom: 30,
    width: 45,
    height: 45,
  },
  withinRadiusImage: {
    borderWidth: 2,
    borderColor: "gold",
  },
});
