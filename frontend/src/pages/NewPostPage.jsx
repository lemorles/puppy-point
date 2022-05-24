import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../actions/postAction";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  Textarea,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { uploadImage } from "../utils/image";
import { useToastContext } from "../context/ToastContext";

export default function NewPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const addToast = useToastContext();
  const [input, setInput] = useState({
    image: "",
    title: "",
    subtitle: "",
    body: "",
    category: "",
  });

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
      dispatch(
        createPost({ ...input, userId: user.id }, history, "/posts", addToast)
      );
    }
  };

  const handleFileInputChange = async (e) => {
    const image = await uploadImage(e.target.files[0]);

    setInput({ ...input, image });
    setErrors(validate({ ...input, image }));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Crear nuevo post
        </Heading>
        <FormControl isRequired>
          <FormLabel>Imagen</FormLabel>
          <Text mt="4px" color={"red"}>
            {errors && errors.image}
          </Text>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                h="200px"
                w="350px"
                borderRadius="10px"
                marginBottom="10px"
                src={input.image}
              />
            </Center>
          </Stack>
          <FormControl>
            <Center w="full">
              <Input
                w="full"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                accept="image/*"
              />
            </Center>
          </FormControl>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Titulo</FormLabel>
          <Input
            placeholder="Titulo del tema..."
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="title"
            onChange={handleChange}
            value={input.title}
          />
          <Text mt="4px" color={"red"}>
            {errors && errors.title}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>SubTitulo</FormLabel>
          <Input
            placeholder="Subtitulo del tema..."
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="subtitle"
            onChange={handleChange}
            value={input.subtitle}
          />
          <Text mt="4px" color={"red"}>
            {errors && errors.subtitle}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Descripcion</FormLabel>
          <Textarea
            placeholder="Aqui van los detalles del tema..."
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="body"
            onChange={handleChange}
            value={input.body}
          />
          <Text mt="4px" color={"red"}>
            {errors && errors.body}
          </Text>
        </FormControl>
        <FormControl>
          <Select
            placeholder="Tema"
            name="category"
            value={input.category}
            onChange={handleChange}
          >
            <option value="services">Servicios</option>
            <option value="tipsCare">Cuidados</option>
            <option value="random">Random</option>
            <option value="updates">Noticias</option>
          </Select>
          <Text mt="4px" color={"red"}>
            {errors && errors.category}
          </Text>
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            onClick={handleSubmit}
            bg={"orange.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "orange.500",
            }}
          >
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

const validate = (input) => {
  let errors = {};

  if (!input.image) {
    errors.image = "Este campo es requerido";
  }

  if (!input.title) {
    errors.title = "Este campo es requerido";
  }

  if (!input.subtitle) {
    errors.subtitle = "Este campo es requerido";
  }

  if (!input.body) {
    errors.body = "Este campo es requerido";
  }

  if (!input.category) {
    errors.category = "Este campo es requerido";
  }

  return errors;
};
