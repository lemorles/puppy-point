import { locationTypes } from "../types/locationTypes";

export const setLatLng = (latLng, location) => {
  return {
    type: locationTypes.SET_LAT_LNG,
    payload: {
      latLng,
      location,
    },
  };
};

export const setPlaceId = (placeId) => {
  return {
    type: locationTypes.SET_PLACE_ID,
    payload: placeId,
  };
};

export const setLocation = (location) => {
  return {
    type: locationTypes.SET_LOCATION,
    payload: location,
  };
};
