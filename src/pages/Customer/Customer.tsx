import { Container } from "@chakra-ui/react";
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
import { useParams } from "react-router-dom";
import { customer } from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { CustomerInputForm } from "@/componets/CustomerInputForm";
import { KartesList } from "@/componets/KartesList";
import { karte } from "@/types";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { Header } from "@/componets/Header";

export const Customer: FC = () => {
  const [customer, setCustomer] = useState<customer>();
  const { id } = useParams<{ id: string }>();
  const api = useMemo(() => createApi(), []);

  useEffect(() => {
    const getData = async () => {
      const customer = await api.customer.getCustomer(id!);
      setCustomer(customer);
    };

    getData();
  }, [api, id]);

  // TODO: user
  // TODO: 灰色のばす

  return (
    customer && (
      <Container maxW="none" p={0} h={"100%"}>
        <MenuBar />
        <Container maxW="none" p={"2rem"} bg={"brandGray.500"} h={"100%"}>
          <VStack alignItems={"start"} gap={"1rem"}>
            <Header customer={customer} />
            <CustomerInputForm customer={customer} />
            <KartesList karteHeaders={customer.kartes} />
          </VStack>
        </Container>
      </Container>
    )
  );
};

export default Customer;
