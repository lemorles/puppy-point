import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleDrawerCart } from "../actions/uiActions";
import {
  getNotifications,
  deleteNotification,
} from "../actions/notificationsActions";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

export default function CustomDrawer({ isOpen }) {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  return (
    <Drawer
      size={"md"}
      isOpen={isOpen}
      placement="right"
      onClose={() => dispatch(toogleDrawerCart())}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader
          fontSize="2xl"
          textTransform={"uppercase"}
          fontWeight={900}
        >
          Notificaciones
        </DrawerHeader>
        <DrawerBody>
          {notifications &&
            notifications?.map((notification) => {
              return (
                <Notificaciones
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  message={notification.message}
                  date={notification.createdAt}
                />
              );
            })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function Notificaciones({ id, title, message, date, userId }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNotification(id));
    dispatch(getNotifications(user.id));
  };

  return (
    <>
      <Flex
        direction={{ base: "row", md: "row" }}
        justify="space-between"
        margin={1.5}
        padding={2.5}
        border="2px solid #c3c6ce"
        rounded={"lg"}
      >
        <Flex direction={{ base: "column", md: "column" }} width={"full"}>
          <Text
            fontSize={"xl"}
            textTransform={"uppercase"}
            fontWeight={700}
            letterSpacing={"0.5"}
          >
            {title}
          </Text>
          <Text as="p" fontSize="sm">
            {message}
          </Text>
          <Text marginRight={-8} as="p" fontSize="11px" textAlign={"right"}>
            {new Date(date).toLocaleDateString("es-es", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </Text>
        </Flex>
        <Flex>
          <Button size={"sm"} onClick={handleDelete} maxW={"8px"}>
            X
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
