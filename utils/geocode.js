import axios from "axios";

const getGeometryFromPlaceId = async (placeId) => {
  try {
    const fetch = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=AIzaSyCLCYwgVj1jdB2PPfbxnUuq3rdLXUYII74`
    );
    // const json = await fetch.json()

    if (fetch.data.status == "OK") {
      return fetch.data.results[0].geometry.location;
    }
  } catch (error) {
    return error;
  }
};


export const getGeometryFromAddress= async (addr) => {
    try {
      const fetch = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${addr}&key=AIzaSyCLCYwgVj1jdB2PPfbxnUuq3rdLXUYII74`
      );

      
      // const json = await fetch.json()
        if (fetch.data.status == "OK") {
          
          return fetch.data.results[0]
      }
    } catch (error) {
      return error;
    }
  };
  