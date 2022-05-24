import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import { getWalkById, inactiveWalkById } from "../actions/walkActions";
import { getDogsByUser } from "../actions/dogActions";
import { translateDay, translateShift } from "../utils/translate";
import { convertDayToNumber, convertNumbertoDay } from "../utils/convert";
import { getDoginReserve, createReserve } from "../actions/reserveActions";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import styles from "../styles/WalkDetail.module.css";
import WalkerReview from "../components/WalkerReview";
import NavBar from "../components/Navbar";
import {
  Grid,
  Avatar,
  Checkbox,
  Image,
  Text,
  useColorModeValue,
  Button,
  Stack,
  FormControl,
  ModalBody,
  FormLabel,
  Select,
  ModalHeader,
  ModalOverlay,
  Modal,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  Flex,
} from "@chakra-ui/react";

export default function WalkDetailPage() {
  const history = useHistory();
  const addToast = useToastContext();
  const colorModeValue = useColorModeValue;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { walk } = useSelector((state) => state.walk);
  const { user } = useSelector((state) => state.user);

  const handleOpen = () => {
    if (user) {
      setIsOpen(true);
    }
  };

  const handleBaja = (e) => {
    e.preventDefault();
    dispatch(inactiveWalkById(walk.id, history, "/home", addToast));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  useEffect(() => {
    dispatch(getWalkById(params.id));
    if (user) dispatch(getDogsByUser(user?.id));
  }, [dispatch, params.id, user]);

  return (
    <>
      <NavBar />
      <Flex
        direction={{ base: "column", md: "column" }}
        justify="space-between"
        margin={3}
        padding={3}
        border="2px solid #c3c6ce"
        bg={colorModeValue("white", "gray.800")}
        rounded={"lg"}
      >
        {/* Desktop */}

        <Flex
          align="center"
          width="full"
          justify="space-between"
          display={{ base: "none", xl: "flex", md: "none" }}
        >
          <Stack
            direction="row"
            spacing="5"
            width="full"
            justify="space-between"
          >
            <Stack
              borderRadius="lg"
              direction="column"
              width="full"
              height={"100%"}
            >
              <Image
                minW={"400px"}
                borderRadius="lg"
                src={walk?.image}
                alt="Paseo"
                objectFit="contain"
                alignItems={"center"}
              />
            </Stack>
            <Stack direction="column" width="full" alignItems={"center"}>
              <Text
                fontSize={"4xl"}
                textTransform={"uppercase"}
                fontWeight={700}
                color="gray.600"
                letterSpacing={"0.5"}
              >
                Paseo por {walk?.location.split(",")[0]}
              </Text>

              <Grid
                templateColumns={"repeat(3, 1fr)"}
                templateRows={"repeat(4, auto)"}
                justifyContent={"space-around"}
                alignItems="center"
                justifyItems={"center"}
                gap={2}
              >
                {walk?.weekdays?.map((d) => (
                  <Button
                    variant="outline"
                    as="em"
                    key={d.id}
                    alignSelf={"center"}
                    colorScheme="teal"
                    size="sm"
                    minW={"180px"}
                  >
                    # {translateDay(d.day)} por la {translateShift(d.shift)}
                  </Button>
                ))}
              </Grid>
              <Stack
                direction="row"
                spacing="5"
                width={"100%"}
                justify="space-between"
                pb={"50px"}
                pt={"20px"}
              >
                <Stack
                  direction="column"
                  spacing="5"
                  width={"100%"}
                  justify="space-between"
                  pt={5}
                  fontWeight={600}
                  letterSpacing={"0.5"}
                >
                  <Text
                    as="p"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="sm"
                  >
                    {walk?.description}
                  </Text>
                  <Text
                    as="p"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="sm"
                  >
                    Permite perros sin castrar:{" "}
                    {walk?.castrated === "yes" ? "Si" : "No"}
                  </Text>
                  <Text
                    as="p"
                    fontSize="sm"
                    color={useColorModeValue("gray.700", "gray.200")}
                  >
                    Perros por paseo: {walk?.maxDogs}
                  </Text>
                  <Text
                    as="p"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="sm"
                  >
                    Precio: $ {walk?.price} .-
                  </Text>
                </Stack>
                <Stack
                  direction="column"
                  spacing="5"
                  width={"100%"}
                  justify="space-around"
                >
                  <Button
                    minW="100%"
                    minH={"100px"}
                    onClick={handleOpenProfile}
                  >
                    <Avatar
                      src={walk?.user?.image}
                      alt={walk?.user?.name}
                      width={"120px"}
                      height={"120px"}
                    />
                    <Stack
                      direction="column"
                      width="full"
                      alignItems={"center"}
                      mt={1}
                    >
                      <Text
                        as="p"
                        color={useColorModeValue("gray.600", "gray.200")}
                        fontSize={"1xl"}
                        textTransform={"uppercase"}
                        fontWeight={700}
                      >
                        {walk?.user?.firstName}
                      </Text>
                      <Text
                        as="p"
                        fontSize={"1xl"}
                        textTransform={"uppercase"}
                        fontWeight={700}
                        color={useColorModeValue("gray.600", "gray.200")}
                      >
                        {walk?.user?.lastName}
                      </Text>
                    </Stack>
                  </Button>
                </Stack>
              </Stack>

              {user ? (
                user?.role === "owner" ? (
                  <Button
                    size="md"
                    height="48px"
                    minW={"180px"}
                    border="2px"
                    onClick={handleOpen}
                    colorScheme="orange"
                  >
                    Reservar
                  </Button>
                ) : user?.role === "walker" ? (
                  user?.id === walk?.user?.id ? (
                    <Button
                      size="md"
                      height="48px"
                      minW={"180px"}
                      border="2px"
                      colorScheme="orange"
                      onClick={handleBaja}
                    >
                      Dar de baja
                    </Button>
                  ) : (
                    <>
                      {" "}
                      <Button
                        size="md"
                        height="48px"
                        minW={"180px"}
                        border="2px"
                        colorScheme="orange"
                        onClick={handleBaja}
                      >
                        Dar de baja
                      </Button>
                    </>
                  )
                ) : (
                  <></>
                )
              ) : (
                <>
                  <Link to={"/login"}>
                    <Text
                      size="md"
                      height="48px"
                      minW={"180px"}
                      borderRadius={"8px"}
                      background={"orange.500"}
                      textAlign={"center"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      fontWeight={500}
                    >
                      Logueate
                    </Text>
                  </Link>
                </>
              )}
            </Stack>
          </Stack>
        </Flex>

        {/* Tablet */}

        <Flex
          align="center"
          width="full"
          justify="space-between"
          display={{ base: "none", xl: "none", md: "flex" }}
        >
          <Stack
            direction="row"
            spacing="5"
            width="full"
            justify="space-between"
          >
            <Stack direction="column" width="50%" alignItems={"center"}>
              <Image
                minW={"200px"}
                borderRadius="lg"
                src={walk?.image}
                alt="Paseo"
                objectFit="contain"
              />

              {user ? (
                user?.role === "owner" ? (
                  <Button
                    size="md"
                    height="48px"
                    minW={"180px"}
                    border="2px"
                    onClick={handleOpen}
                    colorScheme="orange"
                  >
                    Reservar
                  </Button>
                ) : user?.role === "walker" ? (
                  user?.id === walk?.user?.id ? (
                    <Button
                      size="md"
                      height="48px"
                      minW={"180px"}
                      border="2px"
                      colorScheme="orange"
                      onClick={handleBaja}
                    >
                      Dar de baja
                    </Button>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )
              ) : (
                <>
                  <Link to={"/login"}>
                    <Text
                      size="md"
                      height="48px"
                      minW={"180px"}
                      borderRadius={"8px"}
                      background={"orange.500"}
                      textAlign={"center"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      fontWeight={500}
                    >
                      Logueate
                    </Text>
                  </Link>
                </>
              )}
            </Stack>
            <Stack direction="column" width="50%" alignItems={"center"}>
              <Text
                fontSize={"4xl"}
                textTransform={"uppercase"}
                fontWeight={700}
                color="gray.600"
                letterSpacing={"0.5"}
                objectFit="contain"
              >
                Paseo por {walk?.location.split(",")[0]}
              </Text>

              <Stack
                direction="row"
                spacing="5"
                width={"100%"}
                justify="space-between"
                pb={"20px"}
              >
                <Stack
                  direction="column"
                  spacing="5"
                  width={"100%"}
                  justify="space-around"
                >
                  {walk?.weekdays?.map((d) => (
                    <Button
                      variant="outline"
                      as="em"
                      key={d.id}
                      alignSelf={"center"}
                      colorScheme="teal"
                      size="sm"
                      minW={"180px"}
                      objectFit="contain"
                    >
                      # {translateDay(d.day)} por la {translateShift(d.shift)}
                    </Button>
                  ))}
                </Stack>
                <Stack
                  direction="column"
                  spacing="5"
                  width={"100%"}
                  justify="space-between"
                  height={"100px"}
                >
                  <Text
                    as="p"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="sm"
                  >
                    {walk?.description}
                  </Text>
                  <Text
                    as="p"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="sm"
                  >
                    Permite perros sin castrar:{" "}
                    {walk?.castrated === "yes" ? "Si" : "No"}
                  </Text>
                  <Text
                    as="p"
                    fontSize="sm"
                    color={useColorModeValue("gray.700", "gray.200")}
                  >
                    Perros por paseo: {walk?.maxDogs}
                  </Text>
                  <Text
                    as="p"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="sm"
                  >
                    Precio: $ {walk?.price} .-
                  </Text>
                </Stack>
              </Stack>
              <Button width={"70%"} minH={"100px"} onClick={handleOpenProfile}>
                <Avatar
                  src={walk?.user?.image}
                  alt={walk?.user?.name}
                  width={"120px"}
                  height={"120px"}
                />
                <Stack
                  direction="column"
                  width="full"
                  alignItems={"center"}
                  mt={1}
                >
                  <Text
                    as="p"
                    color={useColorModeValue("gray.600", "gray.200")}
                    fontSize={"1xl"}
                    textTransform={"uppercase"}
                    fontWeight={700}
                  >
                    {walk?.user?.firstName}
                  </Text>
                  <Text
                    as="p"
                    fontSize={"1xl"}
                    textTransform={"uppercase"}
                    fontWeight={700}
                    color={useColorModeValue("gray.600", "gray.200")}
                  >
                    {walk?.user?.lastName}
                  </Text>
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </Flex>

        {/* Mobile */}

        <Flex
          align="center"
          width="full"
          justify="space-between"
          display={{ base: "flex", xl: "none", md: "none" }}
        >
          <Stack direction="column" width="full" alignItems={"center"}>
            <Stack direction="column" width="full" alignItems={"center"}>
              <Image
                borderRadius="lg"
                src={walk?.image}
                alt="Paseo"
                objectFit="contain"
              />
            </Stack>
            <Stack
              direction="column"
              width="full"
              alignItems={"left"}
              paddingLeft={5}
            >
              <Text
                fontSize="2xl"
                textTransform={"uppercase"}
                fontWeight={700}
                color="gray.600"
                letterSpacing={"0.5"}
              >
                Paseo por {walk?.location.split(",")[0]}
              </Text>
              <Text
                as="p"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="sm"
              >
                {walk?.description}
              </Text>
              <Text
                as="p"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="sm"
              >
                Permite perros sin castrar:{" "}
                {walk?.castrated === "yes" ? "Si" : "No"}
              </Text>
              <Text
                as="p"
                fontSize="sm"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                Perros por paseo: {walk?.maxDogs}
              </Text>
              <Text
                as="p"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="sm"
              >
                Precio: $ {walk?.price} .-
              </Text>
            </Stack>
            <Stack direction="column" width="full" alignItems={"center"} mt={1}>
              {walk?.weekdays?.map((d) => (
                <Button
                  variant="outline"
                  as="em"
                  key={d.id}
                  alignSelf={"center"}
                  colorScheme="teal"
                  size="sm"
                  minW={"180px"}
                >
                  # {translateDay(d.day)} por la {translateShift(d.shift)}
                </Button>
              ))}
            </Stack>

            {user ? (
              user?.role === "owner" ? (
                <Button
                  size="md"
                  height="48px"
                  minW={"180px"}
                  border="2px"
                  onClick={handleOpen}
                  colorScheme="orange"
                >
                  Reservar
                </Button>
              ) : user?.role === "walker" ? (
                user?.id === walk?.user?.id ? (
                  <Button
                    size="md"
                    height="48px"
                    minW={"180px"}
                    border="2px"
                    colorScheme="orange"
                    onClick={handleBaja}
                  >
                    Dar de baja
                  </Button>
                ) : (
                  <>
                    {" "}
                    <Button
                      size="md"
                      height="48px"
                      minW={"180px"}
                      border="2px"
                      colorScheme="orange"
                      onClick={handleBaja}
                    >
                      Dar de baja
                    </Button>
                  </>
                )
              ) : (
                <></>
              )
            ) : (
              <>
                <Link to={"/login"}>
                  <Text
                    size="md"
                    height="48px"
                    minW={"180px"}
                    borderRadius={"8px"}
                    background={"orange.500"}
                    textAlign={"center"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    fontWeight={500}
                  >
                    Logueate
                  </Text>
                </Link>
              </>
            )}

            <Button minW="100%" minH={"100px"} onClick={handleOpenProfile}>
              <Avatar
                src={walk?.user?.image}
                alt={walk?.user?.name}
                w={20}
                h={20}
              />
              <Stack
                direction="column"
                width="full"
                alignItems={"center"}
                mt={1}
              >
                <Text
                  as="p"
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="sm"
                >
                  {walk?.user?.firstName}
                </Text>
                <Text
                  as="p"
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="sm"
                >
                  {walk?.user?.lastName}
                </Text>
              </Stack>
            </Button>
          </Stack>
        </Flex>

        <NewReserve isOpen={isOpen} onClose={handleClose} />
        <WalkerReview
          isOpen={isOpenProfile}
          onClose={handleCloseProfile}
          walk={walk}
        />
      </Flex>
    </>
  );
}

function NewReserve({ isOpen, onClose }) {
  const addToast = useToastContext();
  const history = useHistory();
  const dispatch = useDispatch();
  const { walk } = useSelector((state) => state.walk);
  const { user } = useSelector((state) => state.user);
  const { dogs } = useSelector((state) => state.dog);
  const { dogsCounter } = useSelector((state) => state.reserve);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    userId: "",
    walkId: "",
    walkerId: "",
    dogCounter: 0,
    date: "",
    shift: "",
    dogsId: [],
  });

  useEffect(() => {
    setInput({
      ...input,
      userId: user?.id,
      walkId: walk?.id,
      walkerId: walk?.user?.id,
      dogCounter: dogsCounter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walk, user, dogsCounter]);

  useEffect(() => {
    if (input.date && input.shift) {
      dispatch(getDoginReserve(input));
    }
  }, [dispatch, input]);

  const handleChange = (e) => {
    setInput({
      ...input,
      shift: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        shift: e.target.value,
      })
    );
  };

  function handleChecksDogs(e) {
    if (input.dogsId.includes(e.target.value)) {
      input.dogsId = input.dogsId.filter((dogsId) => dogsId !== e.target.value);
      setInput((prevInput) => {
        const newInput = { ...prevInput, dogsId: input.dogsId };
        const validation = validate(newInput);
        setErrors(validation);
        return newInput;
      });
    } else {
      setInput((prevInput) => {
        const newInput = {
          ...prevInput,
          dogsId: [...input.dogsId, e.target.value],
        };
        const validation = validate(newInput);
        setErrors(validation);
        return newInput;
      });
    }
  }

  function handleChangeDate(date) {
    setInput({
      ...input,
      date: date,
    });
    setErrors(
      validate({
        ...input,
        date: date,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(validate(input)).length) {
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      /*       alert("Faltan ingresar datos"); */
    } else {
      dispatch(createReserve(input, history, "/checkout/", addToast));
      // setInput({
      //   userId: user?.id,
      //   walkId: "",
      //   date: "",
      //   shift: "",
      //   dogsId: [],
      // });
      // dispatch(onClose);
    }
  }

  const getDays = (walk) => {
    const daysNumber = [0, 1, 2, 3, 4, 5, 6];
    const mapped = walk?.weekdays?.map((x) => convertDayToNumber(x.day));
    const mappedSet = [...new Set(mapped)];
    const result = daysNumber.filter((x) => mappedSet.includes(x));
    return result;
  };

  const isWeekday = (date) => {
    const day = new Date(date).getDay();
    return getDays(walk).includes(day);
  };

  registerLocale("es", es);

  const mappedShift = (walk) => {
    if (walk) {
      const { weekdays } = walk;

      const shiftsfitler = weekdays?.filter((x) => {
        return x.day === convertNumbertoDay(new Date(input.date).getDay());
      });

      return shiftsfitler?.map((x) => (
        <option key={x.id} value={x.shift}>
          {x.shift === "morning"
            ? "Mañana"
            : x.shift === "afternoon"
            ? "Tarde"
            : "Noche"}
        </option>
      ));
    }
  };

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea tu reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl>
              <FormLabel>Dia</FormLabel>
              <DatePicker
                className={styles.datePicker}
                minDate={tomorrow}
                placeholderText="Elija la fecha"
                dateFormat="dd-MM-yyyy"
                selected={input.date}
                onSelect={(date) => handleChangeDate(new Date(date))}
                onChange={(date) => handleChangeDate(new Date(date))}
                filterDate={isWeekday}
                locale="es"
              />
              {errors.date && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.date}
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Turno</FormLabel>
              <Select
                name="shift"
                onChange={(e) => handleChange(e)}
                value={input.shift}
                placeholder="Seleccione el turno"
              >
                {mappedShift(walk)}
              </Select>
              {errors.shift && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.shift}
                </Text>
              )}
            </FormControl>
            {input.date !== "" && input.shift && (
              <FormControl mt={4}>
                <FormLabel>
                  {/* Cupos disponibles: {dogsCounter} /&nbsp; */}
                  Cupos disponibles: {walk?.maxDogs - dogsCounter}
                </FormLabel>
              </FormControl>
            )}
            <FormControl mt={4}>
              <FormLabel>Perros a pasear</FormLabel>

              {walk?.castrated === "yes" ? (
                <>
                  {dogs &&
                    dogs.map((dogs) => {
                      return (
                        <Checkbox
                          marginRight={5}
                          key={dogs.id}
                          name="dogsId"
                          value={dogs.id}
                          selected={input.dogsId.includes(dogs)}
                          onChange={(e) => handleChecksDogs(e)}
                        >
                          {dogs.name}
                        </Checkbox>
                      );
                    })}
                </>
              ) : (
                <>
                  {dogs &&
                    dogs.map((dogs) => {
                      if (dogs.castrated === "yes") {
                        return (
                          <Checkbox
                            marginRight={5}
                            key={dogs.id}
                            name="dogsId"
                            value={dogs.id}
                            selected={input.dogsId.includes(dogs)}
                            onChange={(e) => handleChecksDogs(e)}
                          >
                            {dogs.name}
                          </Checkbox>
                        );
                      } else {
                        return (
                          <Checkbox
                            disabled
                            marginRight={5}
                            key={dogs.id}
                            name="dogsId"
                            value={dogs.id}
                            selected={input.dogsId.includes(dogs)}
                            onChange={(e) => handleChecksDogs(e)}
                          >
                            {dogs.name}
                          </Checkbox>
                        );
                      }
                    })}
                </>
              )}

              {errors.dogsId && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.dogsId}
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="orange" mr={2}>
              Reservar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function validate(input, walk, dogsCounter) {
  let errors = {};
  if (!input.date) {
    errors.date = "Se requiere una fecha";
  }
  if (!input.shift) {
    errors.shift = "Se requiere un turno";
  }
  if (!input.dogsId.length) {
    errors.dogsId = "No tiene seleccionado ningun perro";
  } else if (walk?.maxDogs - dogsCounter < input.dogsId.length) {
    errors.dogsId =
      "La cantidad de perros seleccionada supera el cupo disponible";
  }

  return errors;
}
