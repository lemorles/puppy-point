import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { resetPassword } from "../actions/userActions";
import { useToastContext } from "../context/ToastContext";
import Loader from "../components/Loader";

export default function ResetPasswordPage() {
  const { id: token } = useParams();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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
      dispatch(resetPassword({ password: input.password }, token, addToast));
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

  if (isLoading) return <Loader />;

  return (
    <form>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          // bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Nueva contraseña
          </Heading>
          <FormControl isInvalid={touched.password && errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={touched.confirmPassword && errors.confirmPassword}
          >
            <FormLabel>Repeat password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"orange.400"}
              color={"white"}
              size="lg"
              _hover={{
                bg: "orange.500",
              }}
              onClick={handleSubmit}
            >
              Enviar
            </Button>
            <NavLink to="/">
              <Stack display="flex" justify={"center"}>
                <Button color={"orange.400"} variant={"link"}>
                  Volver a Inicio
                </Button>
              </Stack>
            </NavLink>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}

const validate = (input) => {
  let errors = {};
  let touched = {};

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

  if (input.confirmPassword === "") {
    errors.confirmPassword = "La contraseña es requerida";
    touched.confirmPassword = true;
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.confirmPassword)
  ) {
    errors.confirmPassword =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
    touched.confirmPassword = true;
  } else if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "Las contraseñas no son iguales.";
    touched.confirmPassword = true;
  }

  return { errors, touched };
};
