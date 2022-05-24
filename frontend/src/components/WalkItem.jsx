import React from "react";
import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Stack,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "../styles/WalkItem.module.css";

export default function WalkItem({
  id,
  location,
  description,
  image,
  price,
  walker,
}) {
  const colorModeValue = useColorModeValue;

  return (
    <Link to={`/walks/${id}`} className={styles.WalkItem}>
      <Box
        bg={colorModeValue("white", "gray.800")}
        maxW="100%"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        minH={"420px"}
      >
        <Image
          src={image}
          alt={`Paseo por ${location}`}
          roundedTop="lg"
          height={"200px"}
          width={"100%"}
          objectFit="cover"
          objectPosition="center"
        />

        <Box p="5">
          <Box d="flex" alignItems="baseline">
            <Badge px="2" fontSize="12px" colorScheme="red">
              {location}
            </Badge>
          </Box>
          <Flex
            mt="2"
            mb="1"
            justifyContent="space-between"
            alignContent="center"
          >
            <Box mb={3} fontSize="md" as="h4" lineHeight="tight">
              {description}
            </Box>
          </Flex>

          <Flex
            justifyContent="space-between"
            alignContent="center"
            mt={"10px"}
          >
            <div className={styles.avatar__wrapper}>
              <Avatar src={walker?.image} alt={walker?.name} w={10} h={10} />
              <Stack direction={"column"} spacing={0} fontSize={"xs"} ml={2}>
                <Text fontWeight={500}>{walker?.firstName.toUpperCase()}</Text>
                <Text fontWeight={500}>{walker?.lastName.toUpperCase()}</Text>
              </Stack>
            </div>
            <Box
              fontSize="2xl"
              color={colorModeValue("gray.800", "white")}
              className={styles.price}
            >
              ${price}
            </Box>
          </Flex>
        </Box>
        {/* <Box display={"flex"} justifyContent={"left"} marginLeft={5}> */}
        {/* <Rating reviews={walker?.userReviews} /> */}
        {/* </Box> */}
      </Box>
    </Link>
  );
}

// function Rating({ reviews }) {
//   const amount = reviews
//     ?.map((r) => r.rating)
//     .reduce((prev, curr) => prev + curr, 0);

//   const prom = amount / reviews?.length;

//   return (
//     <SimpleGrid row={2} spacing={4} justifyContent="center">
//       <Box display="flex" mt="2" alignItems="center">
//         {Array(5)
//           .fill("")
//           .map((_, i) => {
//             const roundedRating = Math.round(prom * 2) / 2;

//             if (roundedRating - i >= 1) {
//               return (
//                 <BsStarFill
//                   key={i}
//                   style={{ marginLeft: "1" }}
//                   color={i < prom ? "teal.500" : "gray.300"}
//                 />
//               );
//             }
//             if (roundedRating - i === 0.5) {
//               return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
//             }
//             return <BsStar key={i} style={{ marginLeft: "1" }} />;
//           })}
//       </Box>
//     </SimpleGrid>
//   );
// }
