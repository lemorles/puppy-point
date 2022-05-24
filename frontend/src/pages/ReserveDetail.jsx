import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReserveById, editReserve } from "../actions/reserveActions";
import { translateDay, translateShift } from "../utils/translate";
import { addNotificationCanceledReserve } from "../actions/notificationsActions";
import { clearChat } from "../actions/chatActions";
import Chat from "../components/Chat";
import { useHistory } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Button,
  Stack,
  ButtonGroup,
  Avatar,
  Center,
  Flex,
} from "@chakra-ui/react";

export default function ReserveDetailPage() {
  const colorModeValue = useColorModeValue;
  const [isOpenChat, setOpenChat] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { reserve } = useSelector((state) => state.reserve);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
    dispatch(clearChat());
  };

  const handleCreate = () => {
    history.push(`/review/user/${reserve?.walkerId}`);
  };

  const handleCancelReserve = () => {
    dispatch(editReserve({ id: reserve.id, status: "canceled" }));
    if (user.role === "walker") {
      dispatch(
        addNotificationCanceledReserve({
          title: "RESERVA CANCELADA",
          message:
            "Lamentablemente su paseador cancelo la reserva. En los proximos 10 días lo estaremos contactando para realizar el reintegro",
          userId: reserve?.user?.id,
        })
      );
    }
    if (user.role === "walker") {
      dispatch(
        addNotificationCanceledReserve({
          title: "RESERVA CANCELADA",
          message:
            "Lamentablemente su cliente cancelo la reserva. Ya tendras nuevos paseos",
          userId: reserve?.walk?.user?.id,
        })
      );
    }
    dispatch(getReserveById(params?.id));
  };

  const handleCompleteReserve = () => {
    dispatch(editReserve({ id: reserve.id, status: "completed" }));
    dispatch(getReserveById(params?.id));
  };

  useEffect(() => {
    dispatch(getReserveById(params?.id));
  }, [dispatch, params?.id]);

  return (
    <>
      <Flex
        direction={{ base: "column", md: "column" }}
        justify="space-between"
        margin={3}
        padding={3}
        border="2px solid #c3c6ce"
        bg={colorModeValue("white", "gray.800")}
        rounded={"lg"}
      >
        <Box
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="0.6"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "90%", sm: "80%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              display="flex"
              justifyContent="center"
            >
              <Image
                borderRadius="lg"
                src={reserve?.walk?.image}
                alt={reserve?.walk?.location}
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <Heading fontSize="3xl" color="gray.600">
              Paseo por {reserve?.walk?.location}
            </Heading>
            <Stack marginTop="4" direction="row" align="center">
              <ButtonGroup variant="outline" spacing="6">
                {reserve?.walk?.weekdays?.map((d) => (
                  <Button as="em" key={d.id} colorScheme="teal" size="sm">
                    # {translateDay(d.day)} por la {translateShift(d.shift)}
                  </Button>
                ))}
              </ButtonGroup>
            </Stack>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.100")}
              fontSize="lg"
            >
              {reserve?.walk?.description}
            </Text>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.100")}
              fontSize="lg"
            >
              Permite perros sin castrar:{" "}
              {reserve?.walk?.castrated === "yes" ? "Si" : "No"}
            </Text>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              Perros por paseo: {reserve?.walk?.maxDogs}
            </Text>
            <Stack
              marginTop="4"
              direction="row"
              alignItems="center"
              justifyContent="center"
            ></Stack>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Text
              textTransform={"uppercase"}
              as="p"
              fontWeight={500}
              color={useColorModeValue("gray.700", "gray.100")}
              fontSize="lg"
              marginTop={{ base: "1", sm: "1" }}
            >
              {reserve?.status}
            </Text>
            <Text
              as="p"
              textTransform={"uppercase"}
              color={useColorModeValue("gray.700", "gray.100")}
              fontSize="lg"
              marginTop={{ base: "1", sm: "1" }}
            >
              {new Date(reserve?.date + "T00:00:00").toLocaleDateString(
                "es-es",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
                { timeZone: "UTC" }
              )}
            </Text>
            <Text
              textTransform={"uppercase"}
              as="p"
              color={useColorModeValue("gray.700", "gray.100")}
              fontSize="lg"
              marginTop={{ base: "1", sm: "1" }}
            >
              por la {translateShift(reserve?.shift)}
            </Text>
            <Box
              justifyContent="center"
              alignContent="center"
              alignSelf="center"
              width={{ base: "100%", sm: "80%" }}
              zIndex="2"
              display="flex"
            >
              <Stack marginTop="4" direction="column" align="center">
                <ButtonGroup variant="outline" spacing="6">
                  {reserve?.dogs.map((d) => (
                    <Button as="em" key={d.id} colorScheme="teal" size="sm">
                      {d.name}
                    </Button>
                  ))}
                </ButtonGroup>
              </Stack>
            </Box>

            <Box
              marginTop="4"
              justifyContent="center"
              alignContent="center"
              alignSelf="center"
              width={{ base: "100%", sm: "80%" }}
              zIndex="2"
              display="flex"
            >
              {reserve?.status === "accepted" ? (
                <>
                  <Button
                    size="md"
                    height="48px"
                    minwidth="40%"
                    border="2px"
                    colorScheme="orange"
                    onClick={handleCancelReserve}
                  >
                    Cancelar paseo
                  </Button>
                  <Button
                    size="md"
                    height="48px"
                    minwidth="40%"
                    border="2px"
                    colorScheme="orange"
                    onClick={handleCompleteReserve}
                  >
                    Paseo terminado
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
          >
            {user?.role === "owner" ? (
              <>
                <Center>
                  <Avatar
                    align="center"
                    direction="row"
                    size="xl"
                    src={reserve?.walk?.user?.image}
                  ></Avatar>
                </Center>
                <Heading
                  direction="row"
                  align="center"
                  marginTop="2"
                  fontSize="2xl"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  {reserve?.walk?.user?.firstName}{" "}
                  {reserve?.walk?.user?.lastName}
                </Heading>
              </>
            ) : (
              <>
                <Center>
                  <Avatar
                    align="center"
                    direction="row"
                    size="xl"
                    src={reserve?.user?.image}
                  ></Avatar>
                </Center>
                <Heading
                  direction="row"
                  align="center"
                  marginTop="2"
                  fontSize="2xl"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  {reserve?.user?.firstName} {reserve?.user?.lastName}
                </Heading>
              </>
            )}

            <Stack
              marginTop="4"
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {user?.role === "owner" ? (
                reserve?.status === "accepted" ? (
                  <Button
                    size="md"
                    height="48px"
                    minwidth="40%"
                    border="2px"
                    colorScheme="orange"
                    onClick={handleOpenChat}
                  >
                    Chatea con tu paseador
                  </Button>
                ) : reserve?.status === "completed" ? (
                  <Button
                    size="md"
                    height="48px"
                    minwidth="40%"
                    border="2px"
                    colorScheme="orange"
                    onClick={handleCreate}
                  >
                    Califica a tu paseador
                  </Button>
                ) : (
                  <></>
                )
              ) : reserve?.status === "accepted" ? (
                <Button
                  size="md"
                  height="48px"
                  minwidth="40%"
                  border="2px"
                  colorScheme="orange"
                  onClick={handleOpenChat}
                >
                  Chatea con tu cliente
                </Button>
              ) : (
                <></>
              )}
            </Stack>
          </Box>
        </Box>
        <Chat isOpen={isOpenChat} onClose={handleCloseChat} reserve={reserve} />
      </Flex>
    </>
  );
}
