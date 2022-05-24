import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllUsers } from "../actions/userActions";
import { addNotification } from "../actions/notificationsActions";
import Loader from "../components/Loader";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useToastContext } from "../context/ToastContext";

export default function NewNotification() {
  const history = useHistory();
  const colorModeValue = useColorModeValue;
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullName: "",
    title: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { allUsers, isLoading } = useSelector((state) => state.user);
  const addToast = useToastContext();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChangeAutocomplete = (e) => {
    setInput({
      ...input,
      fullName: e.target.innerText,
    });
    const { errors } = validate({
      ...input,
      fullName: e.target.innerText,
    });
    setErrors(errors);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    const { errors } = validate({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(errors);
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { errors } = validate(input);

    if (Object.keys(errors).length) {
      const { errors, touched } = validate({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(errors);
      setTouched(touched);
    } else {
      dispatch(addNotification({ input }, history, "/home", addToast));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        w={"full"}
        maxW={"md"}
        bg={colorModeValue("white", "gray.700")}
        justify="center"
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={2}
      >
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Crear nueva notificación
        </Heading>

        <Stack spacing={4}>
          <FormControl isInvalid={touched.fullName && errors.fullName}>
            <FormLabel>Usuario</FormLabel>
            <AutoComplete openOnFocus>
              <AutoCompleteInput
                variant="filled"
                name="fullName"
                value={input.fullName}
                onChange={handleChange}
                bg={colorModeValue("white", "gray.500")}
                borderColor={colorModeValue("gray.100", "white")}
              />
              <AutoCompleteList>
                {allUsers &&
                  allUsers.map((e) => (
                    <AutoCompleteItem
                      key={`option-${e.id}`}
                      value={e.fullName}
                      id={e.id}
                      textTransform="capitalize"
                      onClick={handleChangeAutocomplete}
                    >
                      {e.fullName}
                    </AutoCompleteItem>
                  ))}
              </AutoCompleteList>
            </AutoComplete>
            <FormErrorMessage>{errors.breed}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.title && errors.title}>
            <FormLabel>Titulo</FormLabel>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.message && errors.message}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              resize={"vertical"}
              name="message"
              value={input.message}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.message}</FormErrorMessage>
          </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              size="lg"
              bg={"orange.100"}
              color={"white"}
              _hover={{
                bg: "orange.400",
              }}
              onClick={handleSubmit}
            >
              Crear
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}

function validate(input) {
  let errors = {};
  let touched = {};

  if (!input.title) {
    errors.title = "El titulo de la notificación es requerido";
    touched.title = true;
  }

  if (!input.fullName) {
    errors.fullName = "El destinatario es requerido";
    touched.fullName = true;
  }

  if (!input.message) {
    errors.message = "El mensaje de la notificación es requerido";
    touched.message = true;
  }

  return { errors, touched };
}
