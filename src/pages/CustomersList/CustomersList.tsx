import {
  Container,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import { Heading } from "@chakra-ui/react";
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
import { getCustomer, getCustomers } from "@/apis/customers";
import { get } from "react-hook-form";
import { useMyContext } from "@/MyContext";

const CustomersList = () => {
  const [customers, setCustomers] = useState<customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<customer | null>(
    null
  );

  const api = useMemo(() => createApi(), []);

  const rowHighlightColor = useColorModeValue("gray.100", "gray.700");

  const handleRowClick = (customer: customer) => {
    setSelectedCustomer(customer);
  };

  const context = useMyContext();
  const clickDetailButton = async () => {
    if (selectedCustomer?.id) {
      const customer = await api.customer.getCustomer(selectedCustomer.id);
      context.setCustomerDetail(customer);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await api.customer.getCustomers();
      setCustomers(customers);
    };
    fetchCustomers();
  }, []);

  return (
    <Container maxW="none" p={0} h={"100%"}>
      <MenuBar />
      <Container maxW="none" p={"2rem"} bg={"brandGray.500"} h={"100%"}>
        <VStack
          gap={"2rem"}
          bg={"brandGray.0"}
          p={"1rem"}
          borderRadius={"1rem"}
        >
          <Text fontSize={"1.5rem"} fontWeight={"bold"}>
            詳細を表示したいお客様を選択してください
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>会員番号</Th>
                <Th>名前</Th>
                <Th>カナ</Th>
                <Th>性別</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr
                  key={customer?.id}
                  onClick={() => handleRowClick(customer)}
                  bg={
                    selectedCustomer?.id === customer.id
                      ? rowHighlightColor
                      : undefined
                  }
                  border={
                    selectedCustomer?.id === customer.id
                      ? "2px solid blue"
                      : "none"
                  }
                  cursor="pointer"
                >
                  <Td>{customer.card_number}</Td>
                  <Td>{customer.name}</Td>
                  <Td>{customer.kana}</Td>
                  <Td>{customer.gender}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Link as={ReactRouterLink} to="/stylist/detail">
            <Button
              mt={4}
              bg={"brandOrange.500"}
              color={"white"}
              pl={"4rem"}
              pr={"4rem"}
              borderRadius={"5rem"}
              height={"3rem"}
              isDisabled={!selectedCustomer}
              onClick={() => clickDetailButton()}
            >
              詳細
            </Button>
          </Link>
        </VStack>
      </Container>
    </Container>
  );
};
export default CustomersList;
