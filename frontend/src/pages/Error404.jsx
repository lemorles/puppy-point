import React from "react";
import { Link } from "react-router-dom";
import { Heading, Text, Button, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Erro404Found() {
  return (
    <>
      <Navbar />
      <Flex
        textAlign="center"
        direction="column"
        h="90vh"
        justifyContent="center"
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bg="orange.400"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Página No Encontrada
        </Text>
        <Text color={"gray.500"} mb={6}>
          La página que buscas no existe o no esta disponible.
        </Text>
        <Link to={"/"}>
          <Button
            bg="orange.400"
            color="white"
            variant="solid"
            _hover={{ bg: "orange.100" }}
          >
            Volver al página principal
          </Button>
        </Link>
      </Flex>
    </>
  );
}
