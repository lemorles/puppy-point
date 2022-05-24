import React from "react";
import { useDispatch } from "react-redux";
import { deleteReserveById } from "../actions/reserveActions";
import { translateShift } from "../utils/translate";
import {
  CloseButton,
  Stack,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ReservePending({
  location,
  date,
  shift,
  price,
  dogCount,
  id,
  userId,
}) {
  const colorModeValue = useColorModeValue;
  const dispatch = useDispatch();
  const total = price * dogCount;

  const handleDelete = (e) => {
    const payload = { id, userId };
    e.preventDefault();
    dispatch(deleteReserveById(payload));
  };

  const paseo = location.split(",");

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      margin={5}
      padding={3}
      border="2px solid #c3c6ce"
      bg={colorModeValue("white", "gray.800")}
      rounded={"lg"}
    >
      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <Stack direction="row" spacing="5" width="full" justify="space-between">
          <Text
            fontSize="lg"
            textTransform={"uppercase"}
            fontWeight={900}
            letterSpacing={1}
            alignSelf={"center"}
            width={"400px"}
          >
            Paseo en {paseo[0]}
          </Text>

          <Text
            textTransform={"uppercase"}
            fontWeight={400}
            fontSize="sm"
            alignSelf={"center"}
            minW={"200px"}
          >
            {new Date(date + "T00:00:00").toLocaleDateString(
              "es-es",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
              { timeZone: "UTC" }
            )}
            - {translateShift(shift)}
          </Text>

          <Text
            textTransform={"uppercase"}
            fontWeight={400}
            fontSize="sm"
            alignSelf={"center"}
          >
            $ {price} X {dogCount}
          </Text>

          <Text
            textTransform={"uppercase"}
            fontWeight={700}
            fontSize="sm"
            alignSelf={"center"}
          >
            $ {total}
          </Text>
          <CloseButton
            fontWeight={500}
            onClick={handleDelete}
            alignSelf={"center"}
          />
        </Stack>
      </Flex>

      {/* Mobile */}
      <Flex
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Stack direction="column" width="full" alignItems={"center"}>
          <CloseButton onClick={handleDelete} />
          <Text
            fontSize="lg"
            textTransform={"uppercase"}
            fontWeight={800}
            letterSpacing={"0.5"}
          >
            Paseo en {paseo[0]}
          </Text>

          <Text textTransform={"uppercase"} fontWeight={400} fontSize="sm">
            {new Date(date + "T00:00:00").toLocaleDateString(
              "es-es",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
              { timeZone: "UTC" }
            )}
            - {translateShift(shift)}
          </Text>
          <Stack direction="row">
            <Text textTransform={"uppercase"} fontWeight={400} fontSize="sm">
              $ {price} X {dogCount}
            </Text>
            <Text textTransform={"uppercase"} fontWeight={700} fontSize="sm">
              = $ {total}
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
}
