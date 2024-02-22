import {
  Container,
  Heading,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState, FC, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import {
  customer,
  getHairAmountText,
  getHairHardnessText,
  getHairThicknessText,
} from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { formatDate } from "@/utils/utils";
import { Slider, SliderWithText } from "../Slider";
import { WomanIcon } from "../../icons/index";

type props = {
  name: string;
};

export const Header: FC<props> = ({ name }) => {
  return (
    <VStack alignItems={"start"}>
      <Text fontSize={"1.25rem"} fontWeight={"bold"}>{`${
        name ?? "未設定"
      } 様`}</Text>
    </VStack>
  );
};

export default Header;
