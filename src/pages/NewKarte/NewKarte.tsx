import {
  Container,
  Button,
  Link,
  Box,
  Text,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { useMyContext } from "@/MyContext";
import { HairAmount } from "../../types/enum";
import { gender } from "@/types/enum";
import { HairHardness } from "@/types/enum";
import { HairThickness } from "@/types/enum";
import { HairColor } from "../../types/enum";
import { MenuBar } from "@/componets/MenuBar";
import { Header } from "@/componets/Header";
import { colors } from "@/theme";

export const NewKarte: FC = () => {
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
    const todays_cut = {
      hair_length: hair_length.value,
      hair_color: hair_color.value,
      perm: hair_parm.value,
    };
    const customer = {
      card_number: card_number.value,
      birthday: new Date(birthday.value),
      name: name.value,
      kana: kana.value,
      gender: gender.value,
      phone_number: phone_number.value,
      adress: adress.value,
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
    console.log(customer);
    console.log(customer.memo2);
  }

  function getEnumOptionsNumber(array: any[]) {
    return array
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => {
        return <option value={value}>{key}</option>;
      });
  }

  function getEnumOptionsText(array: any[]) {
    return array
      .filter(([key]) => isNaN(Number(key)))
      .map(([key]) => {
        return <option value={key}>{key}</option>;
      });
  }

  function generateRandomDigits() {
    let digits = "";
    while (digits.length < 16) {
      const randomDigits = Math.floor(Math.random() * 1e15).toString();
      digits += randomDigits;
    }
    return digits.substring(0, 16);
  }

  return (
    <Container maxW="none" p={0} h="100%">
      <MenuBar />
      <Container maxW="none" p={"2rem"} bg={colors.bgAll} h={"100%"}>
        <VStack gap="2rem" bg={colors.bgMain} p="1rem" borderRadius="1rem">
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
                  <InputLeftAddon bg={colors.bgLabel}>会員番号</InputLeftAddon>
                  <Input
                    type="number"
                    isReadOnly
                    value={generateRandomDigits()}
                    id="card_number"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>名前</InputLeftAddon>
                  <Input type="text" value="高橋 朱美" id="name" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>カナ</InputLeftAddon>
                  <Input type="text" value="タカハシ アケミ" id="kana" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>生年月日</InputLeftAddon>
                  <Input type="date" value="2000-10-01" id="birthday" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>性別</InputLeftAddon>
                  <Select id="gender" value="1">
                    {getEnumOptionsNumber(Object.entries(gender))}
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>電話番号</InputLeftAddon>
                  <Input
                    type="tel"
                    value="090-9999-9999"
                    placeholder="090-1234-5678"
                    id="phone_number"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>
                    メールアドレス
                  </InputLeftAddon>
                  <Input type="adress" value="sample@sample.jp" id="adress" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>住所</InputLeftAddon>
                  <Input type="text" value="港区XXXXXXXXXXX" id="adress" />
                </InputGroup>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    お客様の体質
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>髪の量</InputLeftAddon>
                  <Select id="hair_amount" value="2">
                    {getEnumOptionsNumber(Object.entries(HairAmount))}
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>髪の硬さ</InputLeftAddon>
                  <Select id="hair_hardness" value="1">
                    {getEnumOptionsNumber(Object.entries(HairHardness))}
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>髪の太さ</InputLeftAddon>
                  <Select id="hair_thickness" value="1">
                    {getEnumOptionsNumber(Object.entries(HairThickness))}
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>クセ</InputLeftAddon>
                  <Select id="hair_curly">
                    <option value="指定なし">指定なし</option>
                    <option value="少し">少し</option>
                    <option value="強い">強い</option>
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>顔の形</InputLeftAddon>
                  <Select id="face_shape" value="逆三角">
                    <option value="指定なし">指定なし</option>
                    <option value="丸型">丸型</option>
                    <option value="卵型">卵型</option>
                    <option value="四角">四角</option>
                    <option value="逆三角">逆三角</option>
                    <option value="ベース">ベース</option>
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>
                    頭皮の状態
                  </InputLeftAddon>
                  <Select id="scalp_condition" value="普通">
                    <option value="指定なし">指定なし</option>
                    <option value="乾燥">乾燥</option>
                    <option value="普通">普通</option>
                    <option value="脂性">脂性</option>
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>
                    その他（アレルギー等）
                  </InputLeftAddon>
                  <Input type="text" value="花粉" id="allergy" />
                </InputGroup>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    本日の施術
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>髪の長さ</InputLeftAddon>
                  <Select id="hair_length" value="ロング：肩よりも長い">
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
                  <InputLeftAddon bg={colors.bgLabel}>
                    髪のカラー
                  </InputLeftAddon>
                  <Select id="hair_color" value="ピンク">
                    {getEnumOptionsText(Object.entries(HairColor))}
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon bg={colors.bgLabel}>パーマ</InputLeftAddon>
                  <Select id="hair_parm" value="カール">
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
              bg={colors.bgButton}
              color={colors.fgButton}
              pl={"4rem"}
              pr={"4rem"}
              borderRadius={"5rem"}
              height={"3rem"}
              onClick={getInputValue}
            >
              髪型イメージ選択へ
            </Button>
          </Link>
        </VStack>
      </Container>
    </Container>
  );
};

export default NewKarte;
