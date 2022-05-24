import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editUser } from "../actions/userActions";
import { getAge } from "../utils/getAge";
import logo from "../assets/logo.png";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Select,
  Text,
  InputGroup,
  InputLeftAddon,
  Flex,
  Image,
  Heading,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";
import { uploadImage } from "../utils/image";
import { useToastContext } from "../context/ToastContext";
import { getAuth } from "../utils/auth";
import { regex } from "../utils/regex";
import UserContext from "../context/UserContext";

export default function SignupGoogle() {
  let colorModeValue = useColorModeValue;
  const [errors, setErrors] = useState({});
  const user = getAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const addToast = useToastContext();
  const [input, setInput] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    role: "",
    gender: "",
    phone: "",
    image: "",
    status: "active",
  });
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setInput({
      id: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      birthdate: user.birthdate || "",
      role: user.role || "",
      gender: user.gender || "",
      phone: user.phone || "",
      image: user.image || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleFileInputChange = async (e) => {
    const image = await uploadImage(e.target.files[0]);

    setInput({ ...input, image });
    setErrors(validate({ ...input, image }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(validate(input)).length) {
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      dispatch(editUser(input, history, "/home", addToast, setUser));
    }
  };

  return (
    <form>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={colorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"} justifyContent="center">
            <NavLink to="/">
              <Flex align={"center"}>
                <Image
                  h={"60px"}
                  w={"auto"}
                  src={logo}
                  objectFit={"cover"}
                  mr="3"
                />
                <Heading fontSize={"4xl"}>PuppyPoint</Heading>
              </Flex>
            </NavLink>
          </Stack>
          <Box
            rounded={"lg"}
            bg={colorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Completa tu perfil
            </Heading>
            <FormControl pt={2}>
              <FormLabel>Foto de perfil</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar
                    size="xl"
                    src={input.image}
                    onClick={() => setInput({ ...input, image: "" })}
                  >
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove image"
                      icon={<FiX />}
                    />
                  </Avatar>
                </Center>

                <Center w="full">
                  <Input
                    type="file"
                    name="image"
                    value={input.file}
                    onChange={handleFileInputChange}
                  />
                </Center>
              </Stack>
              {errors.image && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.image}
                </Text>
              )}
            </FormControl>
            <FormControl pt={3} isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                disabled
                type="text"
                name="firstName"
                value={input.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.firstName}
                </Text>
              )}
            </FormControl>
            <FormControl pt={2} isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                disabled
                type="text"
                name="lastName"
                value={input.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.lastName}
                </Text>
              )}
            </FormControl>
            <FormControl pt={2} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                disabled
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
              {errors.email && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.email}
                </Text>
              )}
            </FormControl>
            <FormControl pt={2} isRequired>
              <FormLabel>Teléfono</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+54 9" />
                <Input
                  type="tel"
                  name="phone"
                  value={input.phone || ""}
                  onChange={handleChange}
                />
              </InputGroup>
              {errors.phone && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.phone}
                </Text>
              )}
            </FormControl>
            <FormControl pt={2} isRequired>
              <FormLabel>Género</FormLabel>
              <Select
                name="gender"
                value={input.gender}
                onChange={handleChange}
              >
                <option value={""}>Género</option>
                <option value={"F"}>Femenino</option>
                <option value={"M"}>Masculino</option>
              </Select>
              {errors.gender && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.gender}
                </Text>
              )}
            </FormControl>
            <FormControl pt={2} isRequired>
              <FormLabel>Rol</FormLabel>
              <Select name="role" value={input.role} onChange={handleChange}>
                <option value={""}>Rol</option>
                <option value={"owner"}>Quiero contratar un paseo</option>
                <option value={"walker"}>Quiero pasear perros</option>
              </Select>
              {errors.role && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.role}
                </Text>
              )}
            </FormControl>
            <FormControl pt={2} isRequired>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input
                type="date"
                name="birthdate"
                value={input.birthdate}
                onChange={handleChange}
              />
              {errors.birthdate && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.birthdate}
                </Text>
              )}
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errors.password && (
                <Text fontSize={"xs"} color={"red.600"} mt="4px">
                  {errors.password}
                </Text>
              )}
            </FormControl>
            <Stack pt={7} spacing={6} direction={["column", "row"]}>
              <Button
                bg={"orange.400"}
                color={"white"}
                size="lg"
                w="full"
                _hover={{
                  bg: "orange.500",
                }}
                onClick={handleSubmit}
              >
                Completar datos
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

const validate = (input) => {
  let errors = {};
  let touched = {};

  if (!input.firstName) {
    errors.firstName = "Nombre es requerido";
  } else if (!regex.fullName.test(input.firstName)) {
    errors.firstName = "Nombre solo acepta letras";
  }

  if (!input.lastName) {
    errors.lastName = "Apellido es requerido";
  } else if (!regex.fullName.test(input.lastName)) {
    errors.lastName = "Apellido solo acepta letras";
  }

  if (!input.password) {
    errors.password = "Contraseña es requerida";
    touched.password = true;
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
  ) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
    touched.password = true;
  }

  if (!input.email) {
    errors.email = "Email es requerido";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
    errors.email = "Email invalido, ejemplo@ejemplo.com";
  }

  if (!input.birthdate) {
    errors.birthdate = "Fecha de nacimiento es requerida";
  } else if (getAge(input.birthdate) < 18) {
    errors.birthdate = "Debes tener mayoria de edad, para poder registrarse";
  }

  if (!input.role) {
    errors.role = "Rol es requerido";
  }

  if (!input.gender) {
    errors.gender = "Genero es requerido";
  }

  if (!input.phone) {
    errors.phone = "Telefono es requerido";
  } else if (input.phone.length < 10) {
    errors.phone = "Telefono requiere mas de 10 numeros";
  }

  if (!input.image) {
    errors.image = "Imagen es requerida";
  }

  return errors;
};
