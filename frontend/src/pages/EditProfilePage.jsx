import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import UserPasswordEdtit from "../components/UserPasswordEdit";
import UserProfileEdit from "../components/UserProfileEdit";
import { NavLink } from "react-router-dom";

export default function Perfil() {
  return (
    <Flex w={"full"} justify="center">
      <Stack
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        justify="center"
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={2}
      >
        <Tabs>
          <TabList>
            <Tab
              fontWeight={600}
              letterSpacing={1}
              fontSize={{ base: "lg", sm: "2xl" }}
            >
              Perfil
            </Tab>
            <Tab
              fontWeight={600}
              letterSpacing={1}
              fontSize={{ base: "lg", sm: "2xl" }}
            >
              Constraseña
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <UserProfileEdit />
            </TabPanel>
            <TabPanel>
              <UserPasswordEdtit />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Stack>
          <NavLink to="/account/deactivate">
            <Text fontSize={"sm"} mt="4px" textAlign={"center"}>
              ¿Querés desactivar tu cuenta?
            </Text>
          </NavLink>
        </Stack>
      </Stack>
    </Flex>
  );
}
