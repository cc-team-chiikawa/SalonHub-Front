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
  getGenderText,
  getHairAmountText,
  getHairHardnessText,
  getHairThicknessText,
} from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { formatDate } from "@/utils/utils";
import { Slider, SliderWithText } from "../Slider";
import { WomanIcon } from "../../icons/index";
import { gender } from "@/types/enum";

type props = {
  customer: customer;
};

export const MemberInformation: FC<props> = ({ customer }) => {
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      width={"100%"}
      bg={"brandGray.0"}
      p={"1rem"}
      borderRadius={"1rem"}
    >
      <AccordionItem>
        <h2>
          <AccordionButton pl={0}>
            <HStack as="span" flex="1" textAlign="left">
              <Text>会員情報</Text>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Grid
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText
                labelText={"会員番号"}
                value={customer.card_number}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText
                labelText={"生年月日"}
                value={formatDate(customer.birthday)}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText
                labelText={"性別"}
                value={gender[(customer.gender ?? 0) as gender]}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText
                labelText={"電話番号"}
                value={customer.phone_number}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText
                labelText={"メールアドレス"}
                value={customer.adress}
              />
            </GridItem>
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MemberInformation;

type LabeledTextProps = {
  labelText: string;
  value: string;
};

const LabeledText: FC<LabeledTextProps> = ({ labelText, value }) => {
  return (
    <LabeledComponent labelText={labelText}>
      <Text>{value}</Text>
    </LabeledComponent>
  );
};

type LabeledComponentProps = {
  labelText: string;
};

const LabeledComponent: FC<PropsWithChildren<LabeledComponentProps>> = ({
  labelText,
  children,
}) => {
  return (
    <VStack align={"start"}>
      <Text>{labelText}</Text>
      <Box pl={5}>{children}</Box>
    </VStack>
  );
};
