import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { logoutUser } from "../actions/userActions";
import { toogleDrawerCart } from "../actions/uiActions";
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import DarkMode from "./DarkMode";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import { FiChevronDown, FiMenu, FiShoppingCart } from "react-icons/fi";

export default function MobileNav({ onOpen, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const { isOpenDrawer } = useSelector((state) => state.ui);

  const handleClickLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser(history, "/login"));
    localStorage.removeItem("token");
    localStorage.removeItem("store");
  };

  const handleNotification = (e) => {
    e.preventDefault();
    if (isOpenDrawer === true) {
      dispatch(toogleDrawerCart(false));
    } else {
      dispatch(toogleDrawerCart(true));
    }
  };

  if (
    location.pathname === "/" ||
    location.pathname.includes("/walks") ||
    location.pathname.includes("/posts")
  ) {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 0, md: 4 }}
        height="20"
        alignItems="center"
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <HStack spacing={{ base: "4", md: "8" }}>
          {user && <DarkMode />}
          {user && user.role === "owner" && (
            <NavLink to={"/checkout"}>
              <Icon as={FiShoppingCart} cursor="pointer" />
            </NavLink>
          )}

          {user &&
            (notifications?.length > 0 ? (
              <Icon
                as={IoNotifications}
                cursor="pointer"
                color={"orange"}
                onClick={handleNotification}
              />
            ) : (
              <Icon
                as={IoNotificationsOutline}
                cursor="pointer"
                onClick={handleNotification}
              />
            ))}

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"xs"} src={user && user.image} />
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <NavLink to={"/home"}>
                  <MenuItem>Home</MenuItem>
                </NavLink>
                <NavLink to={"/users/edit"}>
                  <MenuItem>Perfil</MenuItem>
                </NavLink>
                <MenuDivider />
                <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <NavLink to={"/"}>
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontWeight="bold"
        >
          Puppy Point
        </Text>
      </NavLink>
      <HStack spacing={{ base: "4", md: "8" }}>
        {user && <DarkMode />}
        {user && user.role === "owner" && (
          <NavLink to={"/checkout"}>
            <Icon as={FiShoppingCart} cursor="pointer" />
          </NavLink>
        )}
        {user &&
          (notifications?.length > 0 ? (
            <Icon
              as={IoNotifications}
              cursor="pointer"
              color={"orange"}
              onClick={handleNotification}
            />
          ) : (
            <Icon
              as={IoNotificationsOutline}
              cursor="pointer"
              onClick={handleNotification}
            />
          ))}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user && user.image} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user && user.firstName ? user.firstName : ""}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user && user.role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <NavLink to={"/users/edit"}>
                <MenuItem>Perfil</MenuItem>
              </NavLink>
              <MenuDivider />
              <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
