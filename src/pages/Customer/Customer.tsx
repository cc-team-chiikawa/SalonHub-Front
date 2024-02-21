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
import { HistoryInformation } from "@/componets/HistoryInformation";
import { karte } from "@/types";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { Header } from "@/componets/Header";
import { MemberInformation } from "@/componets/MemberInformation";
import { KarteInformation } from "@/componets/KarteInformation";
import { useMyContext } from "@/MyContext";

export const Customer: FC = () => {
  const [customer, setCustomer] = useState<customer>();
  const context = useMyContext();

  useEffect(() => {
    const getData = async () => {
      const customer = context.customerDetail;
      setCustomer(customer);
    };

    getData();
  }, []);

  // TODO: user
  // TODO: 灰色のばす

  return (
    customer && (
      <Container maxW="none" p={0} h={"100%"}>
        <MenuBar />
        <Container maxW="none" p={"2rem"} bg={"brandGray.500"} h={"100%"}>
          <VStack alignItems={"start"} gap={"1rem"}>
            <Header customer={customer} />
            <MemberInformation customer={customer} />
            <KarteInformation customer={customer} />
            <HistoryInformation customer={customer} />
          </VStack>
        </Container>
      </Container>
    )
  );
};

export default Customer;