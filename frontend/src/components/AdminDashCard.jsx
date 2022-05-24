import React from "react";
import {
  Box,
  Stat,
  useColorModeValue,
  StatLabel,
  StatNumber,
  Flex,
} from "@chakra-ui/react";

import s from "../styles/UsersCard.module.css";
export default function UsersCard({ name, number, icon }) {
  const colorModeValue = useColorModeValue;
  return (
    <Stat
      px={{ base: 2, md: 5 }}
      py={"4"}
      shadow={"xl"}
      className={s.card}
      rounded={"lg"}
      bg={colorModeValue("white", "gray.800")}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            <h4>{name}</h4>
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            <h5>{number}</h5>
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "white")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
