import React from "react";
import { Link } from "react-router-dom";
import { Box, Center, Text, Stack, Image } from "@chakra-ui/react";
import styles from "../styles/Post.module.css";

export default function PostCard({
  id,
  image,
  title,
  subtitle,
  updatedAt,
  user,
}) {
  return (
    <Link to={`/posts/${id}`}>
      <Center mb={"20px"}>
        <Box
          // maxW={"350px"}
          // h={"500px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          borderRadius="10px"
        >
          <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
            <Image
              src={image}
              layout={"fill"}
              className={styles.img}
              borderRadius="10px 10px 0 0"
            />
          </Box>
          <Stack>
            <Text
              color={"gray.700"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"large"}
              letterSpacing={1}
              // isTruncated
            >
              {title}
            </Text>
            <Text color={"gray.500"} isTruncated maxW={"250px"}>
              {subtitle}
            </Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              {user && (
                <Text
                  fontWeight={600}
                >{`${user.firstName} ${user.lastName}`}</Text>
              )}
              <Text color={"gray.500"}>
                {new Date(updatedAt).toLocaleDateString("es-es", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </Link>
  );
}
