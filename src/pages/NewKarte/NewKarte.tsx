import { Container, Button, Link } from "@chakra-ui/react";
import {
  Heading,
  Box,
  Text,
  Select,
  RadioGroup,
  Radio,
  Stack,
  Flex,
} from "@chakra-ui/react";
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
                会員情報
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* <InputGroup>
              <InputLeftAddon>ID</InputLeftAddon>
              <Input type="text" value={customer?.id} />
            </InputGroup> */}

            <InputGroup>
              <InputLeftAddon>会員番号</InputLeftAddon>
              <Input type="number" isReadOnly value={customer?.card_number} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>生年月日</InputLeftAddon>
              <Input type="date" value={customer?.birthday} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>性別</InputLeftAddon>
              {/* <Select>
                <option value="指定なし">指定なし</option>
                <option value="男性">男性</option>
                <option value="女性">女性</option>
              </Select> */}
              <RadioGroup defaultValue="1">
                <Stack direction="row" align="center">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                </Stack>
              </RadioGroup>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>電話番号</InputLeftAddon>
              <Input
                type="tel"
                value={customer?.phone_number}
                placeholder="090-1234-5678"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>メールアドレス</InputLeftAddon>
              <Input type="email" value={customer?.email} />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>住所</InputLeftAddon>
              <Input type="text" value={customer?.adress} />
            </InputGroup>
            {/* <InputGroup>
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
            </InputGroup> */}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                （仮）カルテ
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
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
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                カットの要望
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <InputGroup>
              <InputLeftAddon>髪の太さ</InputLeftAddon>
              <Input type="text" value={customer?.hair_thickness} />
            </InputGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <VStack gap={"2rem"}>
        <Text fontSize={"1.5rem"} fontWeight={"bold"}>
          CustomersList
        </Text>
        <Link as={ReactRouterLink} to="/customers/hairstyle">
          <Button
            mt={4}
            bg={"brandOrange.500"}
            color={"white"}
            pl={"4rem"}
            pr={"4rem"}
            borderRadius={"5rem"}
            height={"3rem"}
          >
            Hairstyle
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NewKarte;
