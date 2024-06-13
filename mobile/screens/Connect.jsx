import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";

const Connect = () => {
  const markers = [
    {
      title: "Nikola Mirilo",
      description: "IT Project Manager",
      coordinates: { latitude: 44.8361188, longitude: 20.385826 },
      image:
        "https://media.licdn.com/dms/image/D4D03AQHp6VF4VO5OPQ/profile-displayphoto-shrink_200_200/0/1703514537342?e=2147483647&v=beta&t=jviVRwjHgUZ6gdR7ROj9VdpJSDtHMmHo01EpI53Oorc",
    },
    {
      title: "Pera Peric",
      description: "IT Engineer",
      coordinates: { latitude: 44.8399999, longitude: 20.384826 },
      image:
        "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718150400&semt=sph",
    },
    {
      title: "Mika Mikic",
      description: "Business Analyst",
      coordinates: { latitude: 44.8390188, longitude: 20.381424 },
      image:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    },
    {
      title: "Isicko Doricko",
      description: "Marketing Specialist",
      coordinates: { latitude: 44.8398188, longitude: 20.388825 },
      image:
        "https://inspiragrupa.com/wp-content/uploads/2023/01/isidoraninkovic-1.webp",
    },
  ];

  const [coordinates, setCoordinates] = useState(null);

  const startBackgroundTracking = async () => {
    const res = await Location.requestForegroundPermissionsAsync();
    if (res.status == "granted") {
      const data = await Location.getCurrentPositionAsync();
      setCoordinates({
        lat: data.coords.latitude,
        long: data.coords.longitude,
      });
      await Location.requestBackgroundPermissionsAsync();
    }
  };

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

  return (
    <View
      style={tw`flex flex-col p-4 h-full justify-center items-center w-full gap-2`}
    >
      <Button
        onPress={startBackgroundTracking}
        color="green"
        title="Get Location"
      />
      {coordinates ? (
        <>
          <Text>Latitude: {coordinates.lat}</Text>
          <Text>Longitude: {coordinates.long}</Text>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: coordinates.lat,
              longitude: coordinates.long,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Circle
              center={{
                latitude: coordinates.lat,
                longitude: coordinates.long,
              }}
              radius={100}
              fillColor="#A4DFFA"
              strokeColor="transparent"
              zIndex={100}
            />
            {markers.map((marker, index) => {
              const distance = haversineDistance(
                { latitude: coordinates.lat, longitude: coordinates.long },
                marker.coordinates
              );
              const isWithinRadius = distance <= 100;
              return (
                <Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.title}
                  description={marker.description}
                  flat={true}
                >
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
                </Marker>
              );
            })}
          </MapView>
        </>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

export default Connect;

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
