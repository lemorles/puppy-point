
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteHelp, getHelpDetail } from "../actions/helpAction";

import {
  Heading,
  Flex,
  Stack,
  Text,
  Avatar,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToastContext } from "../context/ToastContext";

export default function ContactUsDetail() {
  const { help } = useSelector((state) => state.help);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const addToast = useToastContext();
  const colorModeValue = useColorModeValue;

  useEffect(() => {
    dispatch(getHelpDetail(params.id));
  }, [dispatch, params.id]);

  const handleClickDelete = () => {
    dispatch(deleteHelp(params.id, history, "/contact", addToast));
  };

  console.log(params.id);

  if (help) {
    return (
      <Flex>
        <Box m={5} w="full" h={"full"}>
          <Stack
            bg={colorModeValue("white", "gray.800")}
            boxShadow={"lg"}
            p={5}
            rounded={"xl"}
            align={"center"}
            pos={"relative"}
            _after={{
              content: `""`,
              w: 0,
              h: 0,
              borderLeft: "solid transparent",
              borderLeftWidth: 16,
              borderRight: "solid transparent",
              borderRightWidth: 16,
              borderTop: "solid",
              borderTopWidth: 16,
              borderTopColor: colorModeValue("white", "gray.800"),
              pos: "absolute",
              bottom: "-16px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Button
              size={"sm"}
              alignSelf={"flex-end"}
              onClick={handleClickDelete}
            >
              X
            </Button>
            <Heading as={"h1"} fontSize={"30px"}>
              {help.subject}
            </Heading>
            <Text
              textAlign={"center"}
              color={colorModeValue("gray.600", "gray.400")}
              fontSize={"sm"}
            >
              {help.description}
            </Text>
          </Stack>
          <Flex align={"center"} mt={8} direction={"column"}>
            <Avatar
              size={"lg"}
              src={help?.user?.image}
              alt={help?.user?.image}
              mb={2}
            />
            <Stack spacing={-1} align={"center"}>
              <Text fontWeight={600} fontSize={"20px"}>
                {help?.user?.firstName} {help?.user?.lastName}
              </Text>
              <Text
                fontSize={"sm"}
                color={colorModeValue("gray.600", "gray.400")}
              >
                {help?.user?.email}
              </Text>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    );
  }
}