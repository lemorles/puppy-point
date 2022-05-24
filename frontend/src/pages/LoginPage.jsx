import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle } from "../actions/userActions";
import logo from "../assets/logo.png";
import Loader from "../components/Loader";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { Flex, FormErrorMessage, Icon, Image } from "@chakra-ui/react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToastContext } from "../context/ToastContext";
import UserContext from "../context/UserContext";

export default function LoginPage() {
  const history = useHistory();
  const colorModeValue = useColorModeValue;
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const addToast = useToastContext();
  const { setUser } = useContext(UserContext);

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
      dispatch(loginUser(input, history, "/home", addToast, setUser));
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
    const input = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
      image: res.profileObj.imageUrl,
    };
    dispatch(loginWithGoogle(input, history, "/home", addToast, setUser));
  };

  if (isLoading) return <Loader />;

  return (
    <form>
      <Box maxW={"500px"} m="auto">
        <Stack spacing={4} mx={"auto"} py={12} px={6}>
          <Stack align={"center"}>
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
            <Stack spacing={4}>
              <FormControl isInvalid={touched.email && errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  autoComplete="username"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password && touched.password}>
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
              <Stack spacing={4}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  size="lg"
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.100",
                  }}
                  onClick={handleSubmit}
                >
                  Inicia Sesión
                </Button>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  onSuccess={handleLoginGoogleSuccess}
                  onFailure={handleLoginGoogleFailure}
                  cookiePolicy="single_host_origin"
                  border-radius="2rem"
                  render={(renderProps) => (
                    <>
                      <Stack direction={{ base: "column", sm: "row" }}>
                        <NavLink to="/password/reset">
                          <Button variant={"link"} color={"orange.400"}>
                            ¿Olvidaste tu contraseña?
                          </Button>
                        </NavLink>
                      </Stack>
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
                        <p>Ingresar con Google</p>
                      </button>
                    </>
                  )}
                />
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  ¿No tienes una cuenta?&nbsp;&nbsp;
                  <NavLink to="/signup" color={"orange.400"}>
                    <Button variant={"link"} color={"orange.400"}>
                      Registrate
                    </Button>
                  </NavLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </form>
  );
}

const validate = (input) => {
  let errors = {};
  let touched = {};

  if (input.email === "") {
    errors.email = "El email es requerido";
    touched.email = true;
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
    errors.email = "El email es inválido";
    touched.email = true;
  }

  if (input.password === "") {
    errors.password = "La contraseña es requerida";
    touched.password = true;
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.password)
  ) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
    touched.password = true;
  }

  return { errors, touched };
};
