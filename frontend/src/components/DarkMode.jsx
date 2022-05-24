import React from "react";
import { Icon, useColorMode } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {colorMode === "dark" ? (
        <Icon as={FiMoon} onClick={toggleColorMode} cursor="pointer" />
      ) : (
        <Icon as={FiSun} onClick={toggleColorMode} cursor="pointer" />
      )}
    </>
  );
}
