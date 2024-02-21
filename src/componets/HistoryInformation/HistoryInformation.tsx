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
  Button,
  Spacer,
  Image,
  Center,
  Select,
  Textarea,
  Checkbox,
  ListItem,
  UnorderedList,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { customer, karteHeader } from "@/types/customer";
import { createApi } from "@/apis/createApi";
import { formatDate } from "@/utils/utils";
import { karte } from "../../types/karte";
import { stylist } from "../../types/stylist";
import { AddIcon } from "@chakra-ui/icons";
import { menu } from "@/types";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import {
  CircleAddIcon,
  CircleAddIconGray,
  KarteIcon,
  OrangeTriangle,
} from "@/icons";
import Switch from "react-switch";
import frontImg from "@/assets/chukan/front.jpg";
import backImg from "@/assets/chukan/back.jpg";
import rightImg from "@/assets/chukan/right.jpg";
import leftImg from "@/assets/chukan/left.jpg";

type props = {
  customer: customer;
};

export const HistoryInformation: FC<props> = ({ customer }) => {
  const targetKarte = {};

  const [karte, setKarte] = useState<karte>(targetKarte);

  useEffect(() => {
    const getData = async () => {
      setKarte(karte);
    };

    getData();
  }, []);

  console.log("karte", karte);

  return (
    karte && (
      <Accordion
        defaultIndex={[0]}
        allowMultiple
        width={"100%"}
        bg={"brandGray.0"}
        p={"1rem"}
        borderRadius={"1rem"}
      >
        {" "}
        <AccordionItem>
          <h2>
            <AccordionButton pl={0}>
              <HStack as="span" flex="1" textAlign="left">
                <Text>施術履歴</Text>
              </HStack>
              <AccordionIcon />
            </AccordionButton>
          </h2>{" "}
          <AccordionPanel pb={4}>
            <GridItem rowSpan={1} colSpan={1}>
              <Grid templateRows="1fr" templateColumns="10rem 1fr" gap={4}>
                <GridItem rowSpan={1} colSpan={1}>
                  <VStack align={"start"} gap={4}>
                    <VStack align={"start"}>
                      <TextWithOrangeTriangle text={"要望"} />
                      <Text ml={5}>{karte.order}</Text>
                    </VStack>
                    <VStack align={"start"}>
                      <TextWithOrangeTriangle text={"選択された生成イメージ"} />
                      <Image boxSize="16rem" src={frontImg} alt="" />
                    </VStack>
                  </VStack>{" "}
                </GridItem>
              </Grid>
            </GridItem>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  );
};

export default HistoryInformation;

type TextWithOrangeTriangleProps = {
  text: string;
};

const TextWithOrangeTriangle: FC<TextWithOrangeTriangleProps> = ({ text }) => {
  return (
    <HStack>
      <OrangeTriangle />
      <Text>{text}</Text>
    </HStack>
  );
};
