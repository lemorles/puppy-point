import axios from "axios";
const BASE_URL_LAT_LNG =
  "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
// "https://maps.googleapis.com/maps/api/geocode/json?";

const BASE_URL_PLACE_ID =
  "https://maps.googleapis.com/maps/api/geocode/json?place_id=";

export const getLocation = async (latLong) => {
  // 21.9908918,-103.2349899
  const res = await axios.get(
    // `${BASE_URL_LAT_LNG}-34.4267775,-58.5933547&key=${process.env.REACT_APP_GOOGLE_MAPS_ID}`
    // ); // bs as
    // `${BASE_URL_LAT_LNG}21.9908918,-103.2349899&key=${process.env.REACT_APP_GOOGLE_MAPS_ID}`
    // ); // mexico
    `${BASE_URL_LAT_LNG}${latLong.lat},${latLong.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_ID}`
  ); //maipu
  // const placeId = res.data.results[0].place_id;
  // const result = await axios.get(
  //   `${BASE_URL_PLACE_ID}${placeId}&key=${process.env.REACT_APP_GOOGLE_MAPS_ID}`
  // );
  const placeId = res.data.results[0].place_id;

  const location = res.data.results[0].address_components.find(({ types }) =>
    types.includes("administrative_area_level_2")
  );

  let locality = "";
  if (!location) {
    locality = res.data.results[0].address_components.find(({ types }) =>
      types.includes("locality")
    );
  }

  let city = location ? location.long_name : locality.long_name;

  const { long_name: province } = res.data.results[0].address_components.find(
    ({ types }) => types.includes("administrative_area_level_1")
  );

  const { long_name: country } = res.data.results[0].address_components.find(
    ({ types }) => types.includes("country")
  );

  const compound = `${city}, ${province}, ${country}`;

  return {
    compound,
    city: normalize(city),
    province: normalize(province),
    country: normalize(country),
    placeId,
  };
};

export const getLocationWithPlaceId = async (placeId) => {
  const res = await axios.get(
    `${BASE_URL_PLACE_ID}${placeId}&key=${process.env.REACT_APP_GOOGLE_MAPS_ID}`
  );

  const location = res.data.results[0].address_components.find(({ types }) =>
    types.includes("administrative_area_level_2")
  );

  let locality = "";
  if (!location) {
    locality = res.data.results[0].address_components.find(({ types }) =>
      types.includes("locality")
    );
  }

  if (!location) {
    locality = res.data.results[0].address_components.find(({ types }) =>
      types.includes("route")
    );
  }

  let city = location
    ? location.long_name
    : locality.long_name
    ? locality.long_name
    : "";

  const { long_name: province } = res.data.results[0].address_components.find(
    ({ types }) => types.includes("administrative_area_level_1")
  );

  const { long_name: country } = res.data.results[0].address_components.find(
    ({ types }) => types.includes("country")
  );

  const compound = `${city}, ${province}, ${country}`;

  return {
    compound,
    city: normalize(city),
    province: normalize(province),
    country: normalize(country),
  };
};

export const getLatLng = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({ lat: coords.latitude, lng: coords.longitude });
        },
        () => {
          reject(null);
        }
      );
    });
  }
};

export const deleteCommas = (str) => {
  return str.replace(/,/g, "");
};

export const deleteProvince = (str) => {
  return str.replace("provincia de", "");
};

export const deleteSpaces = (str) => {
  return str.replace("  ", " ");
};

export const normalizeStr = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const normalize = (str) => {
  const lower = str.toLowerCase();
  const normalized = normalizeStr(lower);
  const deletedCommas = deleteCommas(normalized);
  const deletedProvince = deleteProvince(deletedCommas);
  const deletedSpaces = deleteSpaces(deletedProvince);

  return deletedSpaces.trim();
};
