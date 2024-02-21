import { Container, Button, Link } from "@chakra-ui/react";
import { Heading, Box, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import {
  VStack,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { customer } from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { MemberInformation } from "@/componets/MemberInformation";
import { KartesList } from "@/componets/KartesList";
import { karte } from "@/types";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { Header } from "@/componets/Header";

const MainMenu = () => {
  return (
    <Container maxW="none" p={0} h={"100%"}>
      <MenuBar />
      <Container maxW="none" p={"2rem"} bg={"brandGray.500"} h={"100%"}>
        <VStack gap={"2rem"}>
          <Text fontSize={"1.5rem"} fontWeight={"bold"}>
            利用者選択
          </Text>
          <Link as={ReactRouterLink} to="/customers/select-customer">
            <Button
              mt={4}
              bg={"brandOrange.500"}
              color={"white"}
              pl={"4rem"}
              pr={"4rem"}
              borderRadius={"5rem"}
              height={"3rem"}
            >
              お客様
            </Button>
          </Link>
          <Link as={ReactRouterLink} to="/stylist/list">
            <Button
              mt={4}
              bg={"brandOrange.500"}
              color={"white"}
              pl={"4rem"}
              pr={"4rem"}
              borderRadius={"5rem"}
              height={"3rem"}
            >
              美容師
            </Button>
          </Link>
        </VStack>
      </Container>
    </Container>
  );
};
export default MainMenu;
