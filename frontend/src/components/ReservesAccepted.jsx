import React from "react";
import { NavLink } from "react-router-dom";
import { translateShift } from "../utils/translate";
import { Flex, Stack, Text, Button, useColorModeValue } from "@chakra-ui/react";

export default function ReserveAccepted({ reserve }) {
  const colorModeValue = useColorModeValue;
  const paseo = reserve.walk.location.split(",");
  const total = reserve.walk.price * reserve.dogCount;

  return (
    <>
      <Flex
        direction={{ base: "column", md: "column" }}
        justify="space-between"
        margin={5}
        padding={3}
        border="2px solid #c3c6ce"
        bg={colorModeValue("white", "gray.800")}
        rounded={"lg"}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          margin={3}
          padding={2}
          marginX={0}
          marginBottom={0}
          border="2px solid #c3c6ce"
          rounded={"lg"}
        >
          {/* Desktop */}
          <Flex
            width="full"
            justify="space-between"
            display={{ base: "none", xl: "flex", lg: "none" }}
          >
            <Stack
              direction="row"
              spacing="5"
              width="full"
              justify="space-between"
            >
              <Text
                fontSize="lg"
                textTransform={"uppercase"}
                fontWeight={500}
                letterSpacing={1}
                alignSelf={"center"}
                width={"250px"}
              >
                Paseo en {paseo[0]}
              </Text>

              <Text
                textTransform={"uppercase"}
                fontWeight={400}
                justifyContent="left"
                fontSize="sm"
                alignSelf={"center"}
                minW={"200px"}
              >
                {new Date(reserve.date + "T00:00:00").toLocaleDateString(
                  "es-es",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                  { timeZone: "UTC" }
                )}
                - {translateShift(reserve.shift)}
              </Text>

              <Text
                textTransform={"uppercase"}
                fontWeight={400}
                fontSize="sm"
                flexDirection="column"
                justifyContent="left"
                alignItems="left"
                alignSelf={"center"}
                minW={"50px"}
              >
                {" "}
                $ {reserve.walk.price} X {reserve.dogCount}
              </Text>

              <Text
                textTransform={"uppercase"}
                fontWeight={400}
                fontSize="sm"
                flexDirection="column"
                justifyContent="center"
                alignItems="left"
                alignSelf={"center"}
              >
                $ {total}
              </Text>

              <NavLink to={`/reserve/${reserve.id}`}>
                <Button
                  alignSelf={"center"}
                  flex={1}
                  width="150px"
                  colorScheme="blue"
                >
                  Ver detalle
                </Button>
              </NavLink>
            </Stack>
          </Flex>

          {/* Tablet */}
          <Flex
            align="center"
            width="full"
            justify="space-around"
            display={{ base: "none", xl: "none", lg: "flex" }}
          >
            <Stack
              direction="row"
              width="full"
              alignItems={"center"}
              justify="space-around"
            >
              <Stack direction="column" alignItems={"center"}>
                <Stack direction="row">
                  <Text
                    fontSize="lg"
                    textTransform={"uppercase"}
                    fontWeight={500}
                    letterSpacing={"0.5"}
                    alignSelf={"center"}
                  >
                    Paseo en {paseo[0]}
                  </Text>
                </Stack>

                <Stack direction="row">
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={400}
                    justifyContent="left"
                    fontSize="sm"
                    alignSelf={"center"}
                  >
                    {new Date(reserve.date + "T00:00:00").toLocaleDateString(
                      "es-es",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                      { timeZone: "UTC" }
                    )}
                    - {translateShift(reserve.shift)}
                  </Text>
                </Stack>
                <Stack direction="row">
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={400}
                    fontSize="sm"
                    flexDirection="column"
                    justifyContent="left"
                    alignItems="left"
                    alignSelf={"center"}
                  >
                    {" "}
                    $ {reserve.walk.price} X {reserve.dogCount}
                  </Text>

                  <Text
                    textTransform={"uppercase"}
                    fontWeight={500}
                    fontSize="sm"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="left"
                    alignSelf={"center"}
                  >
                    = $ {total}
                  </Text>
                </Stack>
              </Stack>

              <NavLink to={`/reserve/${reserve.id}`}>
                <Button
                  alignSelf={"center"}
                  flex={1}
                  width="150px"
                  colorScheme="blue"
                >
                  Ver detalle
                </Button>
              </NavLink>
            </Stack>
          </Flex>

          {/* Mobile */}
          <Flex
            align="center"
            width="full"
            justify="space-between"
            display={{ base: "flex", xl: "none", lg: "none" }}
          >
            <Stack direction="column" width="full" alignItems={"center"}>
              <Text
                fontSize="lg"
                textTransform={"uppercase"}
                fontWeight={500}
                letterSpacing={"0.5"}
                alignSelf={"center"}
              >
                Paseo en {paseo[0]}
              </Text>

              <Text
                textTransform={"uppercase"}
                fontWeight={400}
                justifyContent="left"
                fontSize="sm"
                alignSelf={"center"}
              >
                {new Date(reserve.date + "T00:00:00").toLocaleDateString(
                  "es-es",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                  { timeZone: "UTC" }
                )}
                - {translateShift(reserve.shift)}
              </Text>
              <Stack direction="row">
                <Text
                  textTransform={"uppercase"}
                  fontWeight={400}
                  fontSize="sm"
                  flexDirection="column"
                  justifyContent="left"
                  alignItems="left"
                  alignSelf={"center"}
                >
                  {" "}
                  $ {reserve.walk.price} X {reserve.dogCount}
                </Text>

                <Text
                  textTransform={"uppercase"}
                  fontWeight={500}
                  fontSize="sm"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="left"
                  alignSelf={"center"}
                >
                  = $ {total}
                </Text>
              </Stack>
              <NavLink to={`/reserve/${reserve.id}`}>
                <Button
                  alignSelf={"center"}
                  flex={1}
                  width="150px"
                  colorScheme="blue"
                >
                  Ver detalle
                </Button>
              </NavLink>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
