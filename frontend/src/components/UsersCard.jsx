import React from "react";
import {
  Text,
  Flex,
  Button,
  Stack,
  SimpleGrid,
  Avatar,
  Badge,
} from "@chakra-ui/react";
import s from "../styles/UsersCard.module.css";

export default function UsersCard({
  name,
  role,
  image,
  id,
  email,
  handleUnset,
  handleSet,
  status,
  handleActive,
  handleLocked,
  handleResetPassword
}) {
  return (
    <>
      <Stack
        minH={"20vh"}
        direction={{ base: "column", md: "row" }}
        rounded={"2xl"}
        boxShadow={"xl"}
        className={s.card}
        align="center"
      >
        <Flex p={4} flex={1} align={"center"} justify={"start"}>
          <Stack display={"flex"} justifyContent={"center"} marginRight={5}>
            <Avatar src={image} alt={image} size={"lg"} boxShadow={"xl"} />
          </Stack>
          <SimpleGrid rows={2} spacing={1}>
            <Text fontSize={"18px"} fontWeight={"bold"}>
              {name}
            </Text>
            <Text fontSize={"14px"} fontWeight={"normal"}>
              {email}
            </Text>
            <Stack direction={{ base: "column", md: "row" }}>
              <Badge fontSize="0.7em" variant="subtle" colorScheme="purple" alignSelf={"center"}>
                {role.toUpperCase()}
              </Badge>
              {status === "active" ? (
                <Badge fontSize="0.7em" variant="subtle" colorScheme="green"  alignSelf={"center"}>
                  Activo
                </Badge>
              ) : status === "locked" ? (
                <Badge fontSize="0.7em" variant="subtle" colorScheme="red"  alignSelf={"center"}>
                  Bloqueado
                </Badge>
              ) : (
                <Badge
                  fontSize="0.7em"
                  variant="subtle"
                  colorScheme="blackAlpha"
                  alignSelf={"center"}
                >
                  Inactivos
                </Badge>
              )}
            </Stack>
          </SimpleGrid>
        </Flex>
        <Stack  spacing={{ base: 2, sm: 6 }}
        direction={{ base: "column", sm: "row" }}
        align="center"
        pb={4}
        pr={5}
        >
            {role === "admin" ? (
              <Button
                size={"sm"}
                w="100px"
                colorScheme={"orange"}
                bg={"orange.400"}
                px={6}
                _hover={{
                  bg: "orange.500",
                }}
                onClick={(e) => handleUnset(e, id)}
              >
                Quitar
              </Button>
            ) : (
              <Button
                size={"sm"}
                w="100px"
                colorScheme={"orange"}
                bg={"orange.500"}
                px={6}
                _hover={{
                  bg: "orange.400",
                }}
                onClick={(e) => handleSet(e, id)}
              >
                Agregar
              </Button>
            )}

            {status === "active" ? (
              <Button
                size={"sm"}
                w="100px"
                colorScheme={"orange"}
                bg={"orange.500"}
                px={6}
                _hover={{
                  bg: "orange.400",
                }}
                onClick={(e) => handleLocked(e, id)}
              >
                Bloquear
              </Button>
            ) : (
              <Button
                size={"sm"}
                w="100px"
                colorScheme={"orange"}
                bg={"orange.400"}
                px={6}
                _hover={{
                  bg: "orange.500",
                }}
                onClick={(e) => handleActive(e, id)}
              >
                Desbloquear
              </Button>
            )}
            <Button
              size={"sm"}
              w="130px"
              colorScheme={"orange"}
              bg={"orange.500"}
              px={6}
              _hover={{
                bg: "orange.400",
              }}
              onClick={(e) => handleResetPassword(e, email)}
            >
              Reiniciar password
            </Button>
        </Stack>
      </Stack>
    </>
  );
}
