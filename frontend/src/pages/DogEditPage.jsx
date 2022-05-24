import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editDog } from "../actions/dogActions";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Select,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { FiX } from "react-icons/fi";
import { useToastContext } from "../context/ToastContext";
import { regex } from "../utils/regex";

export default function Perfil() {
  const history = useHistory();
  const dispatch = useDispatch();
  const addToast = useToastContext();
  const [input, setInput] = useState({
    name: "",
    image: "",
    size: "",
    breed: "",
    gender: "",
    castrated: "",
  });

  const [errors, setErrors] = useState({});
  const { dog, breeds } = useSelector((state) => state.dog);

  const handleChangeAutocomplete = (e) => {
    setInput({
      ...input,
      breed: e.target.innerText,
    });
    setErrors(
      validate({
        ...input,
        breed: e.target.innerText,
      })
    );
  };

  const handleChange = (e) => {
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

  useEffect(() => {
    if (dog) {
      setInput({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        size: dog.size,
        breed: dog && dog.breed && dog.breed.name,
        gender: dog.gender,
        castrated: dog.castrated,
      });
    }
  }, [dog]);

  const handleFileInputChange = (e) => {
    uploadImage(e.target.files[0]);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zvlkgeky");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/puppy-point/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    const image = data.secure_url;
    setInput({ ...input, image });
    setErrors(
      validate({
        ...input,
        image,
      })
    );
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
      dispatch(editDog(input, history, "/home", addToast));
    }
  };

  return (
    <div>
      <Flex w={"full"} justify="center">
        <Stack
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          justify="center"
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={2}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Mascota
          </Heading>
          <FormControl>
            <FormLabel>Foto de mascota</FormLabel>
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
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            {errors.name && (
              <Text fontSize={"xs"} color={"red.600"} mt="4px">
                {errors.name}
              </Text>
            )}
          </FormControl>

          <Flex justify="center" align="center" w="full">
            <FormControl isRequired>
              <FormLabel>Raza</FormLabel>
              <AutoComplete openOnFocus>
                <AutoCompleteInput
                  variant="filled"
                  name="breed"
                  value={input.breed}
                />
                <AutoCompleteList>
                  {breeds?.map((e) => (
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
              <Text mt="4px" fontSize={"xs"} color={"red.600"}>
                {errors && errors.breedId}
              </Text>
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <FormLabel>Género</FormLabel>
            <Select name="gender" value={input.gender} onChange={handleChange}>
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
          <FormControl isRequired>
            <FormLabel>Tamaño</FormLabel>
            <Select name="size" value={input.size} onChange={handleChange}>
              <option value={""}>Tamaño</option>
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
              <option value="giant">Muy grande</option>
            </Select>
            {errors.gender && (
              <Text fontSize={"xs"} color={"red.600"} mt="4px">
                {errors.gender}
              </Text>
            )}
          </FormControl>
          <FormControl isRequired>
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
            {errors.castrated && (
              <Text fontSize={"xs"} color={"red.600"} mt="4px">
                {errors.castrated}
              </Text>
            )}
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
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
        </Stack>
      </Flex>
    </div>
  );
}

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Nombre es requerido";
  } else if (!regex.fullName.test(input.name)) {
    errors.name = "Nombre solo acepta letras";
  }

  if (!input.image) {
    errors.image = "Imagen es requerida";
  }

  if (!input.size) {
    errors.size = "Tamaño es requerido";
  }

  if (!input.breed) {
    errors.breed = "Raza es requerido";
  }

  if (!input.gender) {
    errors.gender = "Genero es requerido";
  }

  if (!input.castrated) {
    errors.castrated = "Castrado es requerido";
  }

  return errors;
}
