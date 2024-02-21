import {
  AbsoluteCenter,
  Button,
  Center,
  Container,
  Divider,
} from "@chakra-ui/react";
import { Heading, Box, Text, Link } from "@chakra-ui/react";
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
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";

export const SelectCustomer: FC = () => {
  const navigate = useNavigate();
  const api = useMemo(() => createApi(), []);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid },
  } = useForm<loginInformation>();

  const onSubmit = async (data: loginInformation) => {
    const { id } = await api.customer.login(data);

    if (id !== undefined) {
      navigate(`/customers/${id}`);
    } else {
      // TODO
    }
  };

  return (
    <Container alignItems={"center"} pt={"10rem"}>
      <VStack gap={"2rem"}>
        <Text fontSize={"1.5rem"} fontWeight={"bold"}>
          カルテ作成モードの選択
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={"2rem"}>
            <Box width={"25rem"}>
              <Text>会員番号</Text>
              <Input
                type="text"
                {...register("cardNumber", {
                  required: "This is required",
                })}
              />
            </Box>
            <Box width={"25rem"}>
              <Text>お客様の生年月日</Text>
              <Input
                type="date"
                {...register("birthday", {
                  required: "This is required",
                })}
              />
            </Box>
            <Button
              mt={4}
              bg={"brandOrange.500"}
              color={"white"}
              isLoading={isSubmitting}
              type="submit"
              isDisabled={!isValid}
              pl={"4rem"}
              pr={"4rem"}
              borderRadius={"5rem"}
              height={"3rem"}
            >
              既存のお客様で作成
            </Button>
          </VStack>
        </form>
        <Link as={ReactRouterLink} to="/customers/new-karte">
          <Box position="relative" padding="10" width={"100%"}>
            <Divider
              borderWidth={"1px"}
              borderColor={" rgba(105, 145, 172, 1)"}
            />
            <AbsoluteCenter bg="white" px="4" width={"5rem"}>
              または
            </AbsoluteCenter>
          </Box>
          <Button
            mt={4}
            bg={"brandOrange.500"}
            color={"white"}
            type="submit"
            pl={"4rem"}
            pr={"4rem"}
            borderRadius={"5rem"}
            height={"3rem"}
          >
            新規のお客様で作成
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default SelectCustomer;
