import React from "react";
import { Link } from "react-router-dom";
import { Badge, Stack, Text } from "@chakra-ui/react";
import s from "../styles/UsersCard.module.css";

export default function ContactUsCard({ id, subject, updatedAt, user }) {
  return (
    <Link to={`/contact/${id}`}>
      <Stack
        minH={"20vh"}
        direction={{ base: "column", md: "row" }}
        rounded={"2xl"}
        boxShadow={"xl"}
        className={s.card}
      >
        <Stack p={4} flex={1} align={"center"} justify={"center"}>
          <Badge variant={"subtle"} color={"orange.300"} >{subject}</Badge>
          <Stack alignItems={"center"}>
            {user && <Text>{`${user.fullName}`}</Text>}
            <Text>
              {new Date(updatedAt).toLocaleDateString("es-es", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
}
