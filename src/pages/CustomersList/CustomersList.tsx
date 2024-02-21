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

const CustomersList = () => {
  return (
    <Container alignItems={"center"} pt={"10rem"}>
      <VStack gap={"2rem"}>
        <Text fontSize={"1.5rem"} fontWeight={"bold"}>
          CustomersList
        </Text>
        <Link as={ReactRouterLink} to="/stylist/customers/1">
          <Button
            mt={4}
            bg={"brandOrange.500"}
            color={"white"}
            pl={"4rem"}
            pr={"4rem"}
            borderRadius={"5rem"}
            height={"3rem"}
          >
            Customer
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};
export default CustomersList;
