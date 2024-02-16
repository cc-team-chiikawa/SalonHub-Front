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

  return (
    customer && (
      <Container>
        <Heading fontSize="xl">{customer?.kana}</Heading>
        <Heading>{customer?.name}</Heading>
        <CustomerInputForm customer={customer} />
        <KartesList karteHeaders={customer.kartes} />
      </Container>
    )
  );
};

export default Customer;
