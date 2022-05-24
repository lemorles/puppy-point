import { locationTypes } from "../types/locationTypes";

const initialState = {
  isLoading: false,
  lat: null,
  lng: null,
  compoundLatLng: null,
  cityLatLng: null,
  provinceLatLng: null,
  countryLatLng: null,
  placeIdLatlng: null,
  error: null,
  placeId: null,
  compound: null,
  city: null,
  province: null,
  country: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case locationTypes.SET_LAT_LNG:
      return {
        ...state,
        lat: action.payload.latLng.lat,
        lng: action.payload.latLng.lng,
        compoundLatLng: action.payload?.location?.compound,
        cityLatLng: action.payload?.location?.city,
        provinceLatLng: action.payload?.location?.province,
        countryLatLng: action.payload?.location?.country,
        placeIdLatlng: action.payload?.location?.placeId,
      };
    case locationTypes.SET_LOCATION:
      return {
        ...state,
        city: action.payload.city,
        province: action.payload.province,
        country: action.payload.country,
        compound: action.payload.compound,
      };
    case locationTypes.SET_PLACE_ID:
      return {
        ...state,
        placeId: action.payload,
      };
    default:
      return state;
  }
};

export default locationReducer;
