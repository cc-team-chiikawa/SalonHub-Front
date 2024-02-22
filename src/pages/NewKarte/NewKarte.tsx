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
import { useMyContext } from "@/MyContext";
import { HairAmount } from "../../types/enum";
import { gender } from "@/types/enum";
import { HairHardness } from "@/types/enum";
import { HairThickness } from "@/types/enum";

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
  const context = useMyContext();

  function getInputValue() {
    const card_number = document.getElementById(
      "card_number"
    ) as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;
    const kana = document.getElementById("kana") as HTMLInputElement;
    const birthday = document.getElementById("birthday") as HTMLInputElement;
    const gender = document.getElementById("gender") as HTMLInputElement;
    const phone_number = document.getElementById(
      "phone_number"
    ) as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const adress = document.getElementById("adress") as HTMLInputElement;
    const hair_amount = document.getElementById(
      "hair_amount"
    ) as HTMLInputElement;
    const hair_hardness = document.getElementById(
      "hair_hardness"
    ) as HTMLInputElement;
    const hair_thickness = document.getElementById(
      "hair_thickness"
    ) as HTMLInputElement;
    const hair_curly = document.getElementById(
      "hair_curly"
    ) as HTMLInputElement;
    const face_shape = document.getElementById(
      "face_shape"
    ) as HTMLInputElement;
    const scalp_condition = document.getElementById(
      "scalp_condition"
    ) as HTMLInputElement;
    const allergy = document.getElementById("allergy") as HTMLInputElement;
    const hair_length = document.getElementById(
      "hair_length"
    ) as HTMLInputElement;
    const hair_color = document.getElementById(
      "hair_color"
    ) as HTMLInputElement;
    const hair_parm = document.getElementById("hair_parm") as HTMLInputElement;

    //objectにセット
    let karte = {
      adress: adress.value,
      hair_curly: hair_curly.value,
      face_shape: face_shape.value,
      scalp_condition: scalp_condition.value,
    };
    let todays_cut = {
      hair_length: hair_length.value,
      hair_color: hair_color.value,
      perm: hair_parm.value,
    };
    let customer = {
      card_number: card_number.value,
      birthday: new Date(birthday.value),
      name: name.value,
      kana: kana.value,
      gender: gender.value,
      phone_number: phone_number.value,
      adress: email.value,
      hair_thickness: Number(hair_thickness.value),
      hair_hardness: Number(hair_hardness.value),
      hair_amount: Number(hair_amount.value),
      allergy: allergy.value,
      // karte変数の内容をmemo1にJSON形式で格納
      memo1: JSON.stringify(karte),
      // todays_cutの内容をmemo2にJSON形式で格納
      memo2: JSON.stringify(todays_cut),
    };
    context.setCustomer(customer);
  }

  function getEnumOptions(array: any[]) {
    return array
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => {
        return <option value={value}>{key}</option>;
      });
  }

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
              <InputGroup>
                <InputLeftAddon>会員番号</InputLeftAddon>
                <Input
                  type="number"
                  isReadOnly
                  value={customer?.card_number}
                  id="card_number"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>名前</InputLeftAddon>
                <Input type="text" value={customer?.name} id="name" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>カナ</InputLeftAddon>
                <Input type="text" value={customer?.kana} id="kana" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>生年月日</InputLeftAddon>
                <Input
                  type="date"
                  value={customer?.birthday?.toISOString()}
                  id="birthday"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>性別</InputLeftAddon>
                <Select id="gender">
                  {getEnumOptions(Object.entries(gender))}
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>電話番号</InputLeftAddon>
                <Input
                  type="tel"
                  value={customer?.phone_number}
                  placeholder="090-1234-5678"
                  id="phone_number"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>メールアドレス</InputLeftAddon>
                <Input type="email" value={customer?.email} id="email" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>住所</InputLeftAddon>
                <Input type="text" value={customer?.adress} id="adress" />
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
                <InputLeftAddon>髪の量</InputLeftAddon>
                <Select id="hair_amount">
                  {getEnumOptions(Object.entries(HairAmount))}
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪の硬さ</InputLeftAddon>
                <Select id="hair_hardness">
                  {getEnumOptions(Object.entries(HairHardness))}
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>髪の太さ</InputLeftAddon>
                <Select id="hair_thickness">
                  {getEnumOptions(Object.entries(HairThickness))}
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>クセ</InputLeftAddon>
                <Select id="hair_curly">
                  <option value="指定なし">指定なし</option>
                  <option value="少し">少し</option>
                  <option value="強い">強い</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>顔の形</InputLeftAddon>
                <Select id="face_shape">
                  <option value="指定なし">指定なし</option>
                  <option value="丸型">丸型</option>
                  <option value="卵型">卵型</option>
                  <option value="四角">四角</option>
                  <option value="逆三角">逆三角</option>
                  <option value="ベース">ベース</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>頭皮の状態</InputLeftAddon>
                <Select id="scalp_condition">
                  <option value="指定なし">指定なし</option>
                  <option value="乾燥">乾燥</option>
                  <option value="普通">普通</option>
                  <option value="脂性">脂性</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>その他（アレルギー等）</InputLeftAddon>
                <Input type="text" value={customer?.allergy} id="allergy" />
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
                <Select id="hair_length">
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
                <Input type="color" id="hair_color"></Input>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>パーマ</InputLeftAddon>
                <Select id="hair_parm">
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
            onClick={getInputValue}
          >
            髪型のイメージ選択へ
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NewKarte;
