import React, { useState } from "react";
import MobileNav from "./MobileNav";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import DarkMode from "./DarkMode";
import { getAuth } from "../utils/auth";
import { useDispatch } from "react-redux";
import { setLocation, setPlaceId } from "../actions/locationActions";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const user = getAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.600", "white")}
    >
      <Flex
        minH={"60px"}
        py={{ base: 0 }}
        px={{ base: 4 }}
        align={"center"}
        maxW={1200}
        margin="auto"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <FiX w={3} h={3} /> : <FiMenu w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          alignItems="center"
        >
          <NavLink to="/">
            <Flex
              flex={{ base: 1 }}
              justify={{ base: "center", md: "start" }}
              alignItems="center"
            >
              <Image src={logo} alt="logo" maxW="40px" marginRight={"2"} />
              <Text
                fontWeight={"bold"}
                display={useBreakpointValue({
                  base: "none",
                  sm: "block",
                })}
                color={useColorModeValue("black", "white")}
              >
                Puppy Point
              </Text>
            </Flex>
          </NavLink>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          align="center"
          direction={"row"}
          spacing={6}
        >
          {user && user.status === "active" ? (
            <MobileNav onOpen={handleOpen} open={open} />
          ) : (
            <>
              <DarkMode />
              <NavLink to="/login">
                <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                  Login
                </Button>
              </NavLink>

              <NavLink to="/signup">
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"orange.100"}
                  _hover={{
                    bg: "orange.400",
                  }}
                >
                  Registarse
                </Button>
              </NavLink>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavCustom />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const resetFilters = (e) => {
    e.preventDefault();

    dispatch(
      setLocation({ city: null, province: null, country: null, compound: null })
    );
    dispatch(setPlaceId(null));
    history.replace("/walks", { search: "" });
  };

  return (
    <Stack direction={"row"} spacing={4}>
      {/* {NAV_ITEMS.map((navItem) => ( */}
      {/* <Box key={navItem.label}> */}
      <Box>
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <NavLink to="/walks" onClick={resetFilters}>
              <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                Paseos
              </Button>
            </NavLink>
          </PopoverTrigger>
        </Popover>
      </Box>
      <Box>
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <NavLink to="/posts">
              <Button fontSize={"sm"} fontWeight={400} variant={"link"}>
                Blog
              </Button>
            </NavLink>
          </PopoverTrigger>
        </Popover>
      </Box>
      {/* ))} */}
    </Stack>
  );
};

const MobileNavCustom = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <NavLink to={href}>
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </NavLink>
      </Flex>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Paseos",
    href: "/walks",
  },
  {
    label: "Blog",
    href: "/posts",
  },
];
