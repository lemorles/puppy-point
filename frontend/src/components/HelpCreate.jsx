import { Flex, Heading, Stack, Textarea, Text, Input, Button, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import { createHelp } from "../actions/helpAction";

export default function NewHelp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state.user);
    const addToast = useToastContext();
    const colorModeValue = useColorModeValue;
    
    const [input, setInput] = useState({
        subject: "",
        description: "",
        status: "open",
    });

    console.log(input);

    const handleCreateHelp = (e) => {
        dispatch(createHelp({
            ...input, userId: user.id 
        }, history, "/home", addToast));
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
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
                  fontSize="25px"
                  marginTop="5"
                  marginBottom="10px"
                  textAlign={"center"}
                >
                    ¿Con qué podemos ayudarte?
                </Heading>
                <Stack>
                    <Text  marginTop="5" marginBottom="10px">Asunto:</Text>
                    <Input 
                      name="subject"
                      placeholder="¿Por qué quiere contactarte?"
                      onChange={handleChange}
                      value={input.subject}
                    />
                </Stack>
                <Stack >
                    <Text marginTop="5" marginBottom="10px">
                        Mensaje:
                    </Text>
                    <Textarea 
                      name="description"
                      onChange={handleChange}
                      value={input.description}
                      marginBottom="10px"
            maxH="300px"
                    />
                </Stack>
                <Stack>
                    <Button
                    size="lg"
                    bg={"orange.100"}
                    color={"white"}
                    _hover={{
                      bg: "orange.400",
                    }}
                      onClick={handleCreateHelp}
                    >
                        Enviar
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}