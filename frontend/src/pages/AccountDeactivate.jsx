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
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deactivateAccount } from "../actions/userActions";
import { useToastContext } from "../context/ToastContext";
import { getAuth } from "../utils/auth";

export default function AccountDeactivatePage() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ message: "", status: "locked" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const user = getAuth();
  const addToast = useToastContext();
  const history = useHistory();

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
      dispatch(deactivateAccount(input, user.id, history, addToast));
    }
  };

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
        maxW={"lg"}
        // bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          ¿Quieres desactivar tu cuenta?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          // color={useColorModeValue("gray.800", "gray.400")}
        >
          Lamentamos que tengas que irte. Pero antes comentanos por qué lo
          haces.
        </Text>
        <FormControl isInvalid={touched.message && errors.message}>
          <Input
            type="text"
            name="message"
            value={input.message}
            onChange={handleChange}
            _focus={{
              borderColor: "orange.400",
            }}
          />
          <FormErrorMessage>{errors.message}</FormErrorMessage>
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
            Desactivar cuenta
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

  if (input.message === "") {
    errors.message = "El mensaje es requerido";
    touched.message = true;
  }

  return { errors, touched };
};
