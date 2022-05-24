import React from "react";
import { useDispatch } from "react-redux";
import { deleteComments, getPostComments } from "../actions/postAction";
import { useToastContext } from "../context/ToastContext";
import {
  chakra,
  Box,
  SimpleGrid,
  Button,
  Image,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getUserId } from "../utils/auth";

export default function PostComment({ comments }) {
  const params = useParams();
  const addToast = useToastContext();

  function TestimonialCard(props) {
    const { id, user, userId, comments, createdAt } = props;
    const dispatch = useDispatch();
    const userIdAuth = getUserId();
    const handleDelete = () => {
      dispatch(deleteComments(id, addToast));
      dispatch(getPostComments(params.id));
    };
    return (
      <Box
        boxShadow={"lg"}
        rounded={"xl"}
        p={10}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Box direction={"column"} textAlign={"left"}>
          <chakra.p fontWeight={"medium"} fontSize={"15px"} pb={4}>
            {comments}
          </chakra.p>
          <HStack
            marginTop="15px"
            marginBottom="25px"
            spacing="2"
            display="flex"
            alignItems="center"
          >
            <Image
              borderRadius="full"
              boxSize="40px"
              src={user.image}
              alt={user.firstName}
            />
            <Text fontWeight="medium">{`${user.firstName} ${user.lastName}`}</Text>
            <Text>—</Text>
            <Text>
              {new Date(createdAt).toLocaleDateString("es-es", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </HStack>
        </Box>
        {userId === userIdAuth && (
          <Button colorScheme="orange" onClick={handleDelete}>
            Eliminar comentario
          </Button>
        )}
      </Box>
    );
  }

  return (
    <div>
      <SimpleGrid spacing={"20"} mt={16} mx={"auto"}>
        {comments.map((cardInfo, index) => (
          <TestimonialCard {...cardInfo} key={cardInfo.id} index={index} />
        ))}
      </SimpleGrid>
    </div>
  );
}
