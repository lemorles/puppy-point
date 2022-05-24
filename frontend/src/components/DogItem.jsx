import { Flex, Box, Image, Badge, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToastContext } from "../context/ToastContext";
import {
  deleteDogById,
  getDogById,
  getDogsByUser,
} from "../actions/dogActions";
import { translateSize } from "../utils/translate";
import s from "../styles/Dog.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function DogItem({
  id,
  name,
  size,
  gender,
  breed,
  image,
  castrated,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const history = useHistory();
  const addToast = useToastContext();
  const { user } = useSelector((state) => state.user);
  const { dog } = useSelector((state) => state.dog);

  useEffect(() => {
    if (dog) dispatch(getDogsByUser(user?.id, ""));
  }, [dispatch, user, dog]);

  const handleClickEdit = () => {
    dispatch(getDogById(id));
    history.push(`/dogs/${id}/edit`);
  };

  const handleClick = () => {
    var opcion = window.confirm(`¿Estas seguro de eliminar a ${name}?`);
    if (opcion) {
      dispatch(deleteDogById(id, addToast));
      dispatch(onClose);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("white", "gray.700")}
          className={s.containModalDetail}
        >
          <ModalHeader fontSize={"25px"}>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={image}
              alt={`Paseo por ${name}`}
              roundedTop="lg"
              height={"200px"}
              width={"100%"}
              objectFit="cover"
              objectPosition={"center"}
            />
            <Box d="flex">
              <Badge
                textAlign={"center"}
                w="100%"
                rounded="3"
                p="2px"
                fontSize="13px"
                colorScheme="blue"
              >
                {breed && breed.name}
              </Badge>
            </Box>

            <Flex
              className={s.columnDetail}
              justifyContent="space-between"
              alignContent="center"
              mt="10px"
            >
              <Badge fontSize="15px" rounded="3">
                {gender === "M" ? "Macho" : "Hembra"}
              </Badge>
              {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
              <Badge fontSize="15px" rounded="3">
                {castrated === "yes" ? "Castrado" : "s/Castrar"}
              </Badge>
              <Badge fontSize="15px" rounded="3">{`${translateSize(
                size
              )}`}</Badge>
              {/* <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              ${price}
            </Box> */}
            </Flex>
          </ModalBody>

          <ModalFooter className={s.buttonModal}>
            <Button colorScheme="blue" mr="10px" onClick={handleClickEdit}>
              Editar
            </Button>
            <Button colorScheme="blue" mr="10px" onClick={handleClick}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Link to={`/dogs/${id}`} className={styles.WalkItem}> */}
      <Box
        onClick={onOpen}
        bg={useColorModeValue("white", "gray.800")}
        maxW="100%"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
      >
        <Image
          src={image}
          alt={`Paseo por ${name}`}
          roundedTop="lg"
          height={"200px"}
          width={"100%"}
          objectFit="cover"
          objectPosition={"center"}
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="3" px="2" fontSize="0.8em" colorScheme="red">
              {breed && breed.name}
            </Badge>
          </Box>
          <Flex
            mt="2"
            mb="1"
            justifyContent="space-between"
            alignContent="center"
          >
            <Box fontSize="md" as="h4" lineHeight="tight">
              {name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
            {/* <Box fontSize="xs" d="flex" alignItems="center">
              {`${translateSize(size)}`.toUpperCase()}
            </Box> */}
            {/* <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              ${price}
            </Box> */}
          </Flex>
        </Box>
      </Box>
      {/* </Link> */}
    </>
  );
}
