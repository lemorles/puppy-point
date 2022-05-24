import {
  Textarea,
  Button,
  Heading,
  Flex,
  Text,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview } from "../actions/reviewActions";
import ReactStars from "react-stars";
import { useHistory } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";


export default function ReviewPage() {
  const { user } = useSelector((state) => state.user);
  const addToast = useToastContext();
  const { reserve } = useSelector((state) => state.reserve);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const colorModeValue = useColorModeValue;

  const [input, setInput] = useState({
    description: "",
    rating: 0,
    ownerId: user.id,
  });

  const handleCreateReview = () => {
    dispatch(createReview({ ...input, userId: reserve?.walkerId }, params.id, addToast));
    history.push("/miscompras");
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (rating) => {
    setInput({
      ...input,
      rating: rating,
    });
  };

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
        <Heading
          as="h2"
          fontSize="30px"
          marginTop="5"
          marginBottom="10px"
          textAlign={"center"}
        >
          Tu opinión nos importa ¡Evalúa tu paseador!
        </Heading>
        <Stack alignItems={"center"}>
          <Text marginTop="5" marginBottom="10px">
            ¿Cuántas estrellas le das a este paseo?
          </Text>
          <ReactStars
            value={input.rating}
            count={5}
            onChange={handleRating}
            size={42}
            activeColor="#ED8936"
          />
        </Stack>
        <Stack alignItems={"center"}>
          <Text marginTop="5" marginBottom="10px">
            Cuéntanos sobre el paseador:
          </Text>
          <Textarea
            name="description"
            placeholder="Escribi tu comentario..."
            onChange={handleChange}
            marginBottom="10px"
            maxH="300px"
          />
        </Stack>
        <Stack spacing={10} pt={2}>
          <Button
            size="lg"
            bg={"orange.100"}
            color={"white"}
            _hover={{
              bg: "orange.400",
            }}
            onClick={handleCreateReview}
          >
            Enviar
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
