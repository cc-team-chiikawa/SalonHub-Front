import { Button, Center, Container } from "@chakra-ui/react";
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
import { customer } from "@/types/customer";
import { createApi } from "@/apis/createApi";
import { useForm } from "react-hook-form";
import { loginInformation } from "@/types";
import { useNavigate } from "react-router-dom";

export const SelectCustomer: FC = () => {
  const navigate = useNavigate();
  const api = useMemo(() => createApi(), []);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid },
  } = useForm<loginInformation>();

  const onSubmit = async (data: loginInformation) => {
    const id = await api.customer.login(data);

    if (id !== undefined) {
      navigate(`/customers/${id}`);
    } else {
      // TODO
    }
  };

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack width={500}>
          <InputGroup>
            <InputLeftAddon>番号</InputLeftAddon>
            <Input
              type="text"
              {...register("cardNumber", {
                required: "This is required",
              })}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>生年月日</InputLeftAddon>
            <Input
              type="date"
              {...register("birthday", {
                required: "This is required",
              })}
            />
          </InputGroup>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            isDisabled={!isValid}
          >
            顧客画面に移動
          </Button>
        </VStack>
      </form>
    </Center>
  );
};

export default SelectCustomer;
