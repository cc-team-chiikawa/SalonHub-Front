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

  return (
    <Container alignItems={"center"} pt={"10rem"}>
      <VStack gap={"2rem"}>
        <Heading fontSize="xl">{customer?.kana}</Heading>
        <Heading>{customer?.name}</Heading>
        <Text fontSize={"1.5rem"} fontWeight={"bold"}>
          カルテの作成
        </Text>
        <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
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
                <InputGroup>
                  <Select>
                    <option value="指定なし">指定なし</option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                  </Select>
                </InputGroup>
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
                  お客様のカルテ
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <InputGroup>
                <InputLeftAddon>髪の太さ</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="とても細い">とても細い</option>
                  <option value="やや細い">やや細い</option>
                  <option value="普通">普通</option>
                  <option value="やや太い">やや太い</option>
                  <option value="とても太い">とても太い</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪の硬さ</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="とても柔らかい">とても柔らかい</option>
                  <option value="やや柔らかい">やや柔らかい</option>
                  <option value="普通">普通</option>
                  <option value="やや硬い">やや硬い</option>
                  <option value="とても硬い">とても硬い</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪の量</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="とても少ない">とても少ない</option>
                  <option value="やや少ない">やや少ない</option>
                  <option value="普通">普通</option>
                  <option value="やや多い">やや多い</option>
                  <option value="とても多い">とても多い</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪のクセ</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="直毛">直毛</option>
                  <option value="やや直毛">やや直毛</option>
                  <option value="普通">普通</option>
                  <option value="ややクセ毛">ややクセ毛</option>
                  <option value="クセ毛">クセ毛</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>顔の形</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="卵型">卵型</option>
                  <option value="丸型">丸型</option>
                  <option value="四角型">四角型</option>
                  <option value="逆三角型">逆三角型</option>
                  <option value="三角型">三角型</option>
                  <option value="楕円型">楕円型</option>
                  <option value="長方形">長方形</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>頭皮の状態</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="乾燥">乾燥</option>
                  <option value="普通">普通</option>
                  <option value="脂性">脂性</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>その他（アレルギー等）</InputLeftAddon>
                <Input type="text" value={customer?.allergy} />
              </InputGroup>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  本日のカット
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <InputGroup>
                <InputLeftAddon>髪の長さ</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="ベリーショート：耳が完全に見えるような短さ">
                    ベリーショート：耳が完全に見えるような短さ
                  </option>
                  <option value="ショート：首周りで切りそろえられた長さ">
                    ショート：首周りで切りそろえられた長さ
                  </option>
                  <option value="ボブ：かごのラインあたりでカットされた長さ">
                    ボブ：かごのラインあたりでカットされた長さ
                  </option>
                  <option value="ミディアム：首の付け根から肩にかかる長さ">
                    ミディアム：首の付け根から肩にかかる長さ
                  </option>
                  <option value="ロング：肩よりも長い">
                    ロング：肩よりも長い
                  </option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪のカラー</InputLeftAddon>
                <Input type="color"></Input>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>パーマ</InputLeftAddon>
                <Select>
                  <option value="指定なし">指定なし</option>
                  <option value="ストレート">ストレート</option>
                  <option value="ウェーブ">ウェーブ</option>
                  <option value="カール">カール</option>
                  <option value="ボリュームアップ">ボリュームアップ</option>
                </Select>
              </InputGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
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
            髪型のイメージ選択へ
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NewKarte;
