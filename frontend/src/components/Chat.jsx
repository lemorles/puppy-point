import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, getChats } from "../actions/chatActions";
import {
  Flex,
  Button,
  Box,
  Center,
  Avatar,
  useColorModeValue,
  Heading,
  Textarea,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function WalkerReview({ isOpen, onClose }) {
  const colorModeValue = useColorModeValue;
  const dispatch = useDispatch();
  const { reserve } = useSelector((state) => state.reserve);
  const { user } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);

  const [input, setInput] = useState({
    message: "",
    sender: parseInt(user.id),
    userId: user.role === "walker" ? reserve?.userId : reserve?.walk?.userId,
    reserveId: reserve?.id,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getChats(reserve?.id));
    }, 1500);
    return () => clearTimeout(timer);
  }, [dispatch, chats, reserve]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.message) {
      dispatch(sendMessage(input));
    }
    dispatch(getChats(input.reserveId));
    setInput({
      ...input,
      message: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      >
        <ModalContent>
          <ModalCloseButton />
          <Flex
            width="full"
            direction={{ base: "column", md: "column" }}
            alignItems={"center"}
          >
            <Flex
              direction={{ base: "column", md: "column" }}
              justify="space-around"
              margin={3}
              padding={3}
              border="2px solid #c3c6ce"
              bg={colorModeValue("white", "gray.800")}
              rounded={"lg"}
              width={"90%"}
              minH={"450px"}
            >
              <Box
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Center>
                    <Avatar
                      align="center"
                      direction="row"
                      size="xl"
                      src={user?.image}
                    ></Avatar>
                  </Center>
                  <Heading
                    direction="row"
                    align="center"
                    marginTop="2"
                    fontSize="2xl"
                    textDecoration="none"
                  >
                    {user?.firstName}
                  </Heading>
                  <Heading
                    direction="row"
                    align="center"
                    marginTop="2"
                    fontSize="2xl"
                    textDecoration="none"
                  >
                    {user?.lastName}
                  </Heading>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ base: "column", sm: "column" }}
                  width={"55%"}
                  minH={"400px"}
                  justifyContent="space-between"
                >
                  <Flex
                    direction={{ base: "column", md: "column" }}
                    justify="space-between"
                    margin={1}
                    padding={1}
                    border="2px solid #c3c6ce"
                    bg={"orange.50"}
                    rounded={"lg"}
                    width={"100%"}
                    height={"100%"}
                  >
                    <Box>
                      <Flex
                        direction={{ base: "column", md: "column" }}
                        border="2px solid #c3c6ce"
                        bg={colorModeValue("white", "gray.800")}
                        rounded={"lg"}
                        mb={1}
                        height={"400px"}
                        overflowY="auto"
                        scrol={5}
                      >
                        {chats &&
                          chats.map((message) => {
                            return (
                              <Messages
                                userlog={user}
                                id={message.id}
                                key={`${message.id}`}
                                createdAt={message.createdAt}
                                sender={message.sender}
                                userId={message.userId}
                                message={message.message}
                              />
                            );
                          })}
                      </Flex>
                    </Box>
                    <Textarea
                      resize={"vertical"}
                      name="message"
                      value={input.message}
                      onChange={handleChange}
                      height={"50px"}
                      border="2px solid #c3c6ce"
                      mb={1}
                      bg={colorModeValue("white", "gray.800")}
                    />

                    <Button
                      size="lg"
                      bg={"orange.400"}
                      color={"white"}
                      _hover={{
                        bg: "orange.100",
                      }}
                      onClick={handleSubmit}
                    >
                      ENVIAR
                    </Button>
                  </Flex>
                </Box>
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                >
                  {user?.role === "walker" ? (
                    <>
                      <Center>
                        <Avatar
                          align="center"
                          direction="row"
                          size="xl"
                          src={reserve?.user?.image}
                        ></Avatar>
                      </Center>
                      <Heading
                        direction="row"
                        align="center"
                        marginTop="2"
                        fontSize="2xl"
                        textDecoration="none"
                      >
                        {reserve?.user?.firstName}
                      </Heading>
                      <Heading
                        direction="row"
                        align="center"
                        marginTop="2"
                        fontSize="2xl"
                        textDecoration="none"
                      >
                        {reserve?.user?.lastName}
                      </Heading>
                    </>
                  ) : (
                    <>
                      <Center>
                        <Avatar
                          align="center"
                          direction="row"
                          size="xl"
                          src={reserve?.walk?.user?.image}
                        ></Avatar>
                      </Center>
                      <Heading
                        direction="row"
                        align="center"
                        marginTop="2"
                        fontSize="2xl"
                        textDecoration="none"
                      >
                        {reserve?.walk?.user?.firstName}
                      </Heading>
                      <Heading
                        direction="row"
                        align="center"
                        marginTop="2"
                        fontSize="2xl"
                        textDecoration="none"
                      >
                        {reserve?.walk?.user?.lastName}
                      </Heading>
                    </>
                  )}
                </Box>
              </Box>
            </Flex>
          </Flex>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

function Messages({ createdAt, sender, userId, message, userlog }) {
  /*   console.log(userlog);
  console.log(sender); */
  return (
    <>
      {parseInt(sender) === parseInt(userlog.id) ? (
        <>
          {" "}
          <Flex
            direction={{ base: "column", md: "column" }}
            margin={1}
            padding={1}
            border="2px solid #c3c6ce"
            rounded={"lg"}
            alignSelf={"flex-start"}
          >
            {" "}
            <Text fontWeight="medium">
              {message} {sender}
            </Text>
            <Text fontSize="xs" alignSelf={"flex-start"}>
              {new Date(createdAt).toLocaleDateString("es-es", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
        </>
      ) : (
        <>
          {" "}
          <Flex
            direction={{ base: "column", md: "column" }}
            margin={1}
            padding={1}
            border="2px solid #c3c6ce"
            rounded={"lg"}
            alignSelf={"flex-end"}
          >
            {" "}
            <Text alignSelf={"flex-end"} fontWeight="medium">
              {message} {sender}
            </Text>
            <Text fontSize="xs" alignSelf={"flex-end"}>
              {new Date(createdAt).toLocaleDateString("es-es", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
        </>
      )}
    </>
  );
}
