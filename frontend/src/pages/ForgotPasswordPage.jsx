import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { forgotPassword } from "../actions/userActions";
import Loader from "../components/Loader";
import { useToastContext } from "../context/ToastContext";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const addToast = useToastContext();
  const { isLoading } = useSelector((state) => state.user);

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
      dispatch(forgotPassword(input, addToast));
    }
  };

  if (isLoading) return <Loader />;

  return (
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
          ¿Olvidaste tu contraseña?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          // color={useColorModeValue("gray.800", "gray.400")}
        >
          Ingrese su email, por favor. Le enviaremos las instrucciones para
          reiniciar su contraseña.
        </Text>
        <FormControl isInvalid={touched.email && errors.email}>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            _focus={{
              borderColor: "orange.400",
            }}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
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
            Restablecer contraseña
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

  return { errors, touched };
};
