import React from "react";
import { NavLink } from "react-router-dom";
import { translateShift, statusTranslate } from "../utils/translate";
import { Flex, Stack, Text, Button, useColorModeValue } from "@chakra-ui/react";

export default function Ordenes({ order }) {
  const colorModeValue = useColorModeValue;

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
        boxShadow={"xl"}
      >
        <Stack
          width="full"
          justify="space-around"
          height={{ sm: "60px", md: "2.7rem" }}
          direction={{ base: "column", md: "row" }}
          padding={1}
          borderBottom="2px solid #c3c6ce"
        >
          <Text
            fontSize="lg"
            textTransform={"uppercase"}
            fontWeight={800}
            letterSpacing={1}
            alignSelf={"center"}
            minW={"220px"}
            textAlign={"center"}
          >
            {new Date(order?.createdAt).toLocaleDateString("es-es", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>

          <Text
            textTransform={"uppercase"}
            fontWeight={600}
            alignSelf={"center"}
            fontSize="sm"
            letterSpacing={1}
            minW={"230px"}
            textAlign={"center"}
          >
            {statusTranslate(order.status)}
          </Text>
        </Stack>

        {order.reserves &&
          order.reserves.map((order) => {
            const paseo = order.walk.location.split(",");
            const total = order.walk.price * order.dogCount;
            return (
              <Flex
                key={order.id}
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
                      fontWeight={400}
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
                      {new Date(order.date + "T00:00:01").toLocaleDateString(
                        "es-es",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                        { timeZone: "UTC" }
                      )}
                      - {translateShift(order.shift)}
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
                      $ {order.walk.price} X {order.dogCount}
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

                    <NavLink to={`/reserve/${order.id}`}>
                      <Button
                        alignItems={"center"}
                        justifyContent={"center"}
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
                          {new Date(
                            order.date + "T00:00:01"
                          ).toLocaleDateString(
                            "es-es",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                            { timeZone: "UTC" }
                          )}
                          - {translateShift(order.shift)}
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
                          $ {order.walk.price} X {order.dogCount}
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

                    <NavLink to={`/reserve/${order.id}`}>
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
                      {new Date(order.date + "T00:00:01").toLocaleDateString(
                        "es-es",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                        { timeZone: "UTC" }
                      )}
                      - {translateShift(order.shift)}
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
                        $ {order.walk.price} X {order.dogCount}
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
                    <NavLink to={`/reserve/${order.id}`}>
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
            );
          })}
      </Flex>
    </>
  );
}
