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
import { useEffect, useMemo, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { customer } from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { formatDate } from "@/utils/utils";

type props = {
  customer: customer;
};

export const CustomerInputForm: FC<props> = ({ customer }) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              ご登録の内容
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Grid
            templateRows="repeat(5, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"会員番号"} value={customer.cardNumber} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText
                title={"生年月日"}
                value={formatDate(customer.birthday)}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"性別"} value={customer.gender} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"電話番号"} value={customer.phoneNumber} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"メールアドレス"} value={customer.address} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"髪の太さ"} value={customer.hairThickness} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"髪の硬さ"} value={customer.hairHardness} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"髪の量"} value={customer.hairAmount} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <LabeledText title={"アレルギー"} value={customer.allergy} />
            </GridItem>
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomerInputForm;

type LabeledTextProps = {
  title: string;
  value: string;
};

const LabeledText: FC<LabeledTextProps> = ({ title, value }) => {
  return (
    <VStack align={"start"}>
      <Text>{title}</Text>
      <Text pl={5}>{value}</Text>
    </VStack>
  );
};

{
  /* <Accordion defaultIndex={[0]} allowMultiple>
<AccordionItem>
  <h2>
    <AccordionButton>
      <Box as="span" flex="1" textAlign="left">
        登録内容
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel pb={4}>
    <FormControl isReadOnly>
      <InputGroup>
        <InputLeftAddon>ID</InputLeftAddon>
        <Input type="text" value={customer?.id} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>番号</InputLeftAddon>
        <Input type="text" value={customer?.cardNumber} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>生年月日</InputLeftAddon>
        <Input type="text" value={customer?.birthday} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>性別</InputLeftAddon>
        <Input type="text" value={customer?.gender} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>電話番号</InputLeftAddon>
        <Input type="text" value={customer?.phoneNumber} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>住所</InputLeftAddon>
        <Input type="text" value={customer?.address} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>髪の太さ</InputLeftAddon>
        <Input type="text" value={customer?.hairThickness} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>髪の硬さ</InputLeftAddon>
        <Input type="text" value={customer?.hairHardness} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>髪の量</InputLeftAddon>
        <Input type="text" value={customer?.hairAmount} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>アレルギー</InputLeftAddon>
        <Input type="text" value={customer?.allergy} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>メモ1</InputLeftAddon>
        <Input type="text" value={customer?.memo1} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>メモ2</InputLeftAddon>
        <Input type="text" value={customer?.memo2} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>メモ3</InputLeftAddon>
        <Input type="text" value={customer?.memo3} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>メモ4</InputLeftAddon>
        <Input type="text" value={customer?.memo4} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>メモ5</InputLeftAddon>
        <Input type="text" value={customer?.memo5} />
      </InputGroup>
    </FormControl>
  </AccordionPanel>
</AccordionItem>
<AccordionItem>
  <h2>
    <AccordionButton>
      <Box as="span" flex="1" textAlign="left">
        施術内容
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
  <AccordionPanel pb={4}>
    <Tabs>
      <TabList overflowX={"auto"}>
        <Tab>2024/02/14</Tab>
        <Tab>2024/02/15</Tab>
        <Tab>2024/02/16</Tab>
        <Tab>2024/02/17</Tab>
        <Tab>2024/02/18</Tab>
        <Tab>2024/02/19</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </AccordionPanel>
</AccordionItem>
</Accordion> */
}
