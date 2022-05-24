import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { passwordEdit } from "../actions/userActions";
import { useToastContext } from "../context/ToastContext";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function PasswordEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const addToast = useToastContext();

  const [input, setInput] = useState({
    id: "",
    password: "",
    newPassword: "",
    passwordcheck: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setInput({ id: user.id, password: "", newPassword: "", passwordcheck: "" });
  }, [user, params]);

  const handleChange = (e) => {
    e.preventDefault();
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
      dispatch(passwordEdit({ ...input }, history, "/home", addToast));
    }
  };

  return (
    <form>
      <FormControl
        pt={2}
        isRequired
        isInvalid={touched.password && errors.password}
      >
        <FormLabel>Password anterior</FormLabel>
        <Input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl
        pt={2}
        isRequired
        isInvalid={touched.newPassword && errors.newPassword}
      >
        <FormLabel>Nueva contraseña</FormLabel>
        <Input
          type="password"
          name="newPassword"
          value={input.newPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
      </FormControl>

      <FormControl
        pt={2}
        isRequired
        isInvalid={touched.passwordcheck && errors.passwordcheck}
      >
        <FormLabel>Confirmar contraseña</FormLabel>
        <Input
          type="password"
          name="passwordcheck"
          value={input.passwordcheck}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <FormErrorMessage>{errors.passwordcheck}</FormErrorMessage>
      </FormControl>

      <Stack pt={8} spacing={6} direction={["column", "row"]}>
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
          Actualizar datos
        </Button>
      </Stack>
    </form>
  );
}

const validate = (input) => {
  let errors = {};
  let touched = {};

  if (!input.password) {
    errors.password = "La contraseña actual es requerida";
    touched.password = true;
  }

  if (!input.newPassword) {
    errors.newPassword = "Contraseña es requerida";
    touched.newPassword = true;
  } else if (
    !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.newPassword)
  ) {
    errors.newPassword =
    "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
    touched.newPassword = true;
  }

  if (input.passwordcheck !== input.newPassword) {
    errors.passwordcheck = "La nueva contraseña no coincide";
    touched.passwordcheck = true;
  }

  return { errors, touched };
};
