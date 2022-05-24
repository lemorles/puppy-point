import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setPlaceId } from "../actions/locationActions";

export default function Location({ onClick, compound }) {
  const dispatch = useDispatch();
  const {
    compoundLatLng,
    cityLatLng,
    provinceLatLng,
    countryLatLng,
    placeIdLatlng,
  } = useSelector((state) => state.location);

  const handleClick = (e) => {
    const location = {
      compoiund: compoundLatLng,
      city: cityLatLng,
      province: provinceLatLng,
      country: countryLatLng,
    };

    e.preventDefault();
    onClick(compound);
    dispatch(setLocation(location));
    dispatch(setPlaceId(placeIdLatlng));
  };

  return (
    <Flex
      align={"center"}
      mt={5}
      _hover={{
        color: "orange.100",
      }}
    >
      <Icon as={FiMapPin} mr={"6px"} onClick={handleClick} cursor="pointer" />
      <Text onClick={handleClick} cursor="pointer">
        {compound}
      </Text>
    </Flex>
  );
}
