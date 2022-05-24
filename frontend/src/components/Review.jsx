import {
  HStack,
  Box,
  Text,
  Image,
  chakra,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function Review({ user, description, createdAt, rating }) {
  // const handleDelete = () => {
  //     dispatch(deleteReview(id));
  //     dispatch(getReviews(params.id));
  // };

  return (
    <Box
      boxShadow={"2xl"}
      rounded={"xl"}
      px={10}
      pt={5}
      bg={useColorModeValue("white", "BlackAlpha.600")}
    >
      <Box direction={"column"} textAlign={"left"}>
        <Box display="flex" justifyContent="right">
          {Array(5)
            .fill("")
            .map((_, i) => {
              const roundedRating = Math.round(rating * 2) / 2;
              if (roundedRating - i >= 1) {
                return (
                  <Icon
                    as={BsStarFill}
                    key={i}
                    style={{ marginLeft: "1" }}
                    color={i < rating ? "orange.300" : "orange.200"}
                  />
                );
              }
              if (roundedRating - i === 0.5) {
                return (
                  <Icon as={BsStarHalf} key={i} style={{ marginLeft: "1" }} />
                );
              }
              return (
                <Icon
                  as={BsStar}
                  key={i}
                  style={{ marginLeft: "1" }}
                  color="orange.200"
                />
              );
            })}
        </Box>
        <chakra.p fontWeight={"medium"} fontSize={"15px"} pb={3}>
          {description}
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
            objectFit={"cover"}
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
    </Box>
  );
}
