import React, { useRef, useState } from "react";
import { StyleSheet, Image, Permission } from "react-native";
import { View } from "react-native-ui-lib";
import MapView, { Marker } from "react-native-maps";
import { Permissions } from "expo";
const vehicleIcon = require("../../../assets/images/car.png");

const RidersMap = ({ coordinates, title , pointer}) => {
  const mapRef = useRef(null);

  return (
    <View>
      <MapView
        initialRegion={{
          ...coordinates,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        ref={mapRef}
        style={{ height: "100%" }}
      >
        <Marker
          coordinate={{
            ...coordinates,
          }}
          identifier="agent"
          anchor={{ x: 0.5, y: 0.5 }}
          title={typeof title === "object" ? title[0] : title}
        >
         {!pointer && <Image source={vehicleIcon} style={{ width: 24, height: 36 }} />}
        </Marker>
      </MapView>
    </View>
  );
};

export default RidersMap;
