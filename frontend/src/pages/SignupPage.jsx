import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginWithGoogle } from "../actions/userActions";
import { getAge } from "../utils/getAge";
import logo from "../assets/logo.png";
import Loader from "../components/Loader";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Image,
  InputLeftAddon,
  Select,
  Icon,
  Tabs,
  TabList,
  Tab,
  FormErrorMessage,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";
import { useToastContext } from "../context/ToastContext";
import UserContext from "../context/UserContext";
import { regex } from "../utils/regex";

export default function SignupPage() {
  let colorModeValue = useColorModeValue;
  const dispatch = useDispatch();
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    phone: "",
    role: "owner",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { isLoading } = useSelector((state) => state.user);
  const addToast = useToastContext();

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
      dispatch(createUser({ ...input }, history, "/home", addToast, setUser));
    }
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

  const handleLoginGoogleFailure = (err) => {
    console.log(err);
  };

  const handleLoginGoogleSuccess = (res) => {
    console.log(res);
    const input = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
      image: res.profileObj.imageUrl,
    };
    dispatch(loginWithGoogle(input, history, "/home", addToast, setUser));
  };

  const handleChangeTabs = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      role: e.target.value,
    });
  };

  if (isLoading) return <Loader />;

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
            <Tabs isFitted>
              <TabList mb="1em" onClick={(e) => handleChangeTabs(e)}>
                <Tab value={"owner"}>Cliente</Tab>
                <Tab value={"walker"}>Paseador</Tab>
              </TabList>
            </Tabs>
            <Stack spacing={4}>
              <FormControl isInvalid={touched.firstName && errors.firstName}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={input.firstName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.lastName && errors.lastName}>
                <FormLabel>Apellido</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={input.lastName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.email && errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChange}
                  autoComplete="username"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.birthdate && errors.birthdate}>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                  type="date"
                  name="birthdate"
                  value={input.birthdate}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.birthdate}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.phone && errors.phone}>
                <FormLabel>Teléfono</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+54 9" />
                  <Input
                    type="tel"
                    name="phone"
                    value={input.phone}
                    onChange={handleChange}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.gender && errors.gender}>
                <FormLabel>Género</FormLabel>
                <Select
                  placeholder="Género"
                  name="gender"
                  value={input.gender}
                  onChange={handleChange}
                >
                  <option value={"F"}>Femenino</option>
                  <option value={"M"}>Masculino</option>
                </Select>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.password && errors.password}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={4} pt={2}>
                <Button
                  size="lg"
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.100",
                  }}
                  onClick={handleSubmit}
                >
                  Registrarse
                </Button>
              </Stack>

              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={handleLoginGoogleSuccess}
                onFailure={handleLoginGoogleFailure}
                cookiePolicy="single_host_origin"
                border-radius="2rem"
                render={(renderProps) => (
                  <>
                    <button
                      onClick={renderProps.onClick}
                      style={{
                        border: "1px solid #ED8936",
                        height: "48px",
                        borderRadius: "0.375rem",
                        color: "#ED8936",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon as={FcGoogle} w={7} h={7} mr={2} />
                      <p>Registrarse con Google</p>
                    </button>
                  </>
                )}
              />
              <Text align={"center"} fontSize={"xs"}>
                Al registrarte, aceptas nuestras Condiciones, la Política de
                datos y la Política de cookies.
              </Text>
              <Stack pt={6}>
                <Text align={"center"}>
                  ¿Tienes una cuenta?&nbsp;&nbsp;
                  <Link color={"blue.400"} href="/login">
                    Login
                  </Link>
                </Text>
              </Stack>
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
    touched.firstName = true;
  } else if (!regex.fullName.test(input.firstName)) {
    errors.firstName = "Nombre solo acepta letras";
    touched.firstName = true;
  }

  if (!input.lastName) {
    errors.lastName = "Apellido es requerido";
    touched.lastName = true;
  } else if (!regex.fullName.test(input.lastName)) {
    errors.lastName = "Apellido solo acepta letras";
    touched.lastName = true;
  }

  if (!input.email) {
    errors.email = "Email es requerido";
    touched.email = true;
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
    errors.email = "Email invalido, ejemplo@ejemplo.com";
    touched.email = true;
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

  if (!input.birthdate) {
    errors.birthdate = "Fecha de nacimiento es requerida";
    touched.birthdate = true;
  } else if (getAge(input.birthdate) < 18) {
    errors.birthdate = "Debes tener mayoria de edad, para poder registrarse";
    touched.birthdate = true;
  }

  if (!input.gender) {
    errors.gender = "Genero es requerido";
    touched.gender = true;
  }

  if (!input.phone) {
    errors.phone = "Telefono es requerido";
    touched.phone = true;
  } else if (input.phone.length < 10) {
    errors.phone = "Telefono requiere mas de 10 numeros";
    touched.phone = true;
  }

  return { errors, touched };
};
