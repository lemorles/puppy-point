import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createDog, getBreeds } from "../actions/dogActions";
import Loader from "../components/Loader";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Select,
  Image,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { uploadImage } from "../utils/image";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useToastContext } from "../context/ToastContext";
import { regex } from "../utils/regex";

export default function NewDogPage() {
  const history = useHistory();
  const colorModeValue = useColorModeValue;
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    image: "",
    size: "",
    breed: "",
    gender: "",
    castrated: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { user } = useSelector((state) => state.user);
  const { isLoading, breeds } = useSelector((state) => state.dog);
  const addToast = useToastContext();

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  const handleChangeAutocomplete = (e) => {
    setInput({
      ...input,
      breed: e.target.innerText,
    });
    const { errors } = validate({
      ...input,
      breed: e.target.innerText,
    });
    setErrors(errors);
    // setTouched({ ...touched, breeds: true });
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

  const handleFileInputChange = async (e) => {
    const image = await uploadImage(e.target.files[0]);

    setInput({ ...input, image });
    const { errors, touched } = validate({ ...input, image });
    setErrors(errors);
    setTouched({ ...touched, image: true });
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
      dispatch(
        createDog({ ...input, userId: user.id }, history, "/home", addToast)
      );
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
          Crear nueva mascota
        </Heading>

        <Stack spacing={4}>
          <FormControl isInvalid={touched.name && errors.name}>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.breed && errors.breed}>
            <FormLabel>Raza</FormLabel>
            <AutoComplete openOnFocus>
              <AutoCompleteInput
                variant="filled"
                name="breed"
                value={input.breed}
                onChange={handleChange}
                bg={colorModeValue("white", "gray.500")}
                borderColor={colorModeValue("gray.100", "white")}
              />
              <AutoCompleteList>
                {breeds &&
                  breeds.map((e) => (
                    <AutoCompleteItem
                      key={`option-${e.id}`}
                      value={e.name}
                      id={e.id}
                      textTransform="capitalize"
                      onClick={handleChangeAutocomplete}
                    >
                      {e.name}
                    </AutoCompleteItem>
                  ))}
              </AutoCompleteList>
            </AutoComplete>
            <FormErrorMessage>{errors.breed}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={touched.image && errors.image}>
            <FormLabel>Imagen</FormLabel>
            <Input
              pt={1}
              name="image"
              type="file"
              onChange={handleFileInputChange}
              accept="image/*"
            />
            <FormErrorMessage>{errors.image}</FormErrorMessage>
            <Flex justify={"center"}>
              {input.image && (
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={input.image}
                  objectFit="cover"
                  alt="perro"
                />
              )}
            </Flex>
          </FormControl>
          <FormControl isInvalid={touched.gender && errors.gender}>
            <FormLabel>Genero</FormLabel>
            <Select
              placeholder="Selecciona genero"
              name="gender"
              value={input.gender}
              onChange={handleChange}
            >
              <option value="M">Macho</option>
              <option value="F">Hembra</option>
            </Select>
            <FormErrorMessage>{errors.gender}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.size && errors.size}>
            <FormLabel>Tamaño</FormLabel>
            <Select
              placeholder="Tamaño"
              name="size"
              value={input.size}
              onChange={handleChange}
            >
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
              <option value="giant">Muy grande</option>
            </Select>
            <FormErrorMessage>{errors.size}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.castrated && errors.castrated}>
            <FormLabel>Castrado</FormLabel>
            <Select
              name="castrated"
              value={input.castrated}
              onChange={handleChange}
            >
              <option value={""}>Castrado</option>
              <option value="no">No</option>
              <option value="yes">Si</option>
            </Select>
            <FormErrorMessage>{errors.castrated}</FormErrorMessage>
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

  if (!input.name) {
    errors.name = "Nombre es requerido";
    touched.name = true;
  } else if (!regex.fullName.test(input.name)) {
    errors.name = "Nombre solo acepta letras";
    touched.name = true;
  }

  if (!input.image) {
    errors.image = "Imagen es requerida";
    touched.image = true;
  }

  if (!input.size) {
    errors.size = "Tamaño es requerido";
    touched.size = true;
  }

  if (!input.breed) {
    errors.breed = "Raza es requerido";
    touched.breed = true;
  }

  if (!input.gender) {
    errors.gender = "Genero es requerido";
    touched.gender = true;
  }

  if (!input.castrated) {
    errors.castrated = "Castrado es requerido";
    touched.castrated = true;
  }

  return { errors, touched };
}
