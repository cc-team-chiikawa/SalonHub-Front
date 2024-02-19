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

export const NewKarte: FC = () => {
  const [customer, setCustomer] = useState<customer>();
  const { id } = useParams<{ id: string }>();
  const api = useMemo(() => createApi(), []);

  useEffect(() => {
    const getData = async () => {
      const customer = await api.getCustomer(id!);
      setCustomer(customer);
    };

    getData();
  }, [api, id]);

  // TODO: user

  return (
    <Container>
      <Heading fontSize="xl">{customer?.kana}</Heading>
      <Heading>{customer?.name}</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
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
                <Input type="text" value={customer?.card_number} />
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
                <Input type="text" value={customer?.phone_number} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>住所</InputLeftAddon>
                <Input type="text" value={customer?.adress} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪の太さ</InputLeftAddon>
                <Input type="text" value={customer?.hair_thickness} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪の硬さ</InputLeftAddon>
                <Input type="text" value={customer?.hair_hardness} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪の量</InputLeftAddon>
                <Input type="text" value={customer?.hair_amount} />
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
      </Accordion>
    </Container>
  );
};

export default NewKarte;
