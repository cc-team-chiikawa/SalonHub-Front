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
  karteHeaders: karteHeader[];
};

export const KartesList: FC<props> = ({ karteHeaders }) => {
  const [karte, setKarte] = useState<karte>();
  const [menus, setMenus] = useState<menu[]>();
  const [stylists, setStylists] = useState<stylist[]>();
  const [selectedKarteId, setSelectedKarteId] = useState<string>(
    karteHeaders[0].id
  );
  const [stylist, setStylist] = useState<stylist>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const api = useMemo(() => createApi(), []);

  const methods = useForm<karte>({ defaultValues: karte });

  useEffect(() => {
    const getData = async () => {
      const karte = await api.karte.getKarte(selectedKarteId);
      setKarte(karte);
      methods.reset(karte);
    };

    getData();
  }, [api, selectedKarteId]);

  useEffect(() => {
    const getData = async () => {
      if (karte) {
        // TODO: 不要かも
        const stylist = await api.stylist.getStylist(karte?.stylistId);
        setStylist(stylist);
      }
    };

    getData();
  }, [api, karte]);

  useEffect(() => {
    // TODO: スタイリストとメニューの取得
    const getData = async () => {
      const menus = await api.menu.getMenus();
      setMenus(menus);

      const stylists = await api.stylist.getStylists();
      setStylists(stylists);
    };
    getData();
  }, [api]);

  const onClickTab = (selectedKarteId: string) => {
    setSelectedKarteId(selectedKarteId);
  };

  const onClickNewKarteButton = () => {
    alert("カルテの新規作成！");
  };

  const onChange = (checked: boolean) => {
    if (!checked) {
      methods.handleSubmit((data) => console.log(data))();
      // TODO: karte取得
    }

    setIsEditMode(checked);
  };
  console.log("karte", karte);
  console.log("menus", menus);

  return (
    karte &&
    stylist &&
    stylists &&
    menus && (
      <Grid
        templateRows="3rem 1fr"
        templateColumns="1fr"
        gap={4}
        width={"100%"}
        bg={"brandGray.0"}
        borderRadius={"1rem"}
        p={"1rem"}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <HStack w={"100%"}>
            <HStack>
              <KarteIcon />
              <Text>あなたのカルテ</Text>
            </HStack>
            <Spacer />
            <Switch
              checked={isEditMode}
              onChange={onChange}
              onColor="#ffa500"
              offColor="#d9d9d9"
              uncheckedIcon={
                <Center height={"100%"} pr={"5px"}>
                  <Text fontSize={"0.75rem"}>閲覧用</Text>
                </Center>
              }
              checkedIcon={
                <Center height={"100%"} pl={"5px"}>
                  <Text color="white" fontSize={"0.75rem"}>
                    入力中
                  </Text>
                </Center>
              }
              width={75}
            />
          </HStack>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Grid templateRows="1fr" templateColumns="10rem 1fr" gap={4}>
            <GridItem rowSpan={1} colSpan={1}>
              <SideMenu
                karteHeaders={karteHeaders}
                selectedKarteId={selectedKarteId}
                onClickTab={onClickTab}
                onClickNewKarteButton={onClickNewKarteButton}
              />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              {isEditMode ? (
                <FormProvider {...methods}>
                  <EditModeKarteForm
                    karte={{ ...karte, stylist }}
                    stylists={stylists}
                    menus={menus}
                  />
                </FormProvider>
              ) : (
                <ViewModeKarteForm
                  karte={{
                    ...karte,
                    stylist,
                    treatmentedMenus: karte.treatmentedMenuIds.map(
                      (id) => menus.find((menu) => menu.id == id)! // TODO:idの型
                    ),
                  }}
                />
              )}
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    )
  );
};

export default KartesList;

// type LabeledTextProps = {
//   title: string;
//   value: string;
// };

// const LabeledText: FC<LabeledTextProps> = ({ title, value }) => {
//   return (
//     <VStack align={"start"}>
//       <Text>{title}</Text>
//       <Text ml={5}>{value}</Text>
//     </VStack>
//   );
// };

type KarteFormProps = {
  karte: karte & { stylist: stylist } & { treatmentedMenus: menu[] };
};

const ViewModeKarteForm: FC<KarteFormProps> = ({ karte }) => {
  console.log(karte);
  return (
    <VStack align={"start"} gap={4}>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"施術後の写真"} />
        <Grid ml={5} templateRows="1fr 1fr" templateColumns="1fr 1fr" gap={4}>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={frontImg} alt="" />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={backImg} alt="" />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={rightImg} alt="" />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={leftImg} alt="" />
          </GridItem>
        </Grid>
      </VStack>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"担当した美容師"} />
        <Text ml={5}>{karte.stylist.name}</Text>
      </VStack>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"施術前の要望"} />
        <Text ml={5}>{karte.order}</Text>
      </VStack>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"実際の施術内容"} />
        <UnorderedList pl={5}>
          {karte.treatmentedMenus.map((menu) => (
            <ListItem key={menu.id}>{menu.name}</ListItem>
          ))}
        </UnorderedList>
      </VStack>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"施術時のメモ"} />
        <Text ml={5}>{karte.memo1}</Text>
      </VStack>
    </VStack>
  );
};

type EditModeKarteFormProps = {
  karte: karte & { stylist: stylist };
  stylists: stylist[];
  menus: menu[];
};

const EditModeKarteForm: FC<EditModeKarteFormProps> = ({ stylists, menus }) => {
  const { register } = useFormContext<karte>();
  return (
    <VStack align={"start"} gap={4}>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"施術後の写真"} />
        <Grid ml={5} templateRows="1fr 1fr" templateColumns="1fr 1fr" gap={4}>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={frontImg} alt="" />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={backImg} alt="" />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={rightImg} alt="" />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image boxSize="8rem" src={leftImg} alt="" />
          </GridItem>
          {/* <GridItem rowSpan={1} colSpan={1}>
            <Box
              backgroundColor={"#d9d9d9"}
              boxSize="8rem"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Center>
                <CircleAddIconGray />
              </Center>
            </Box>
          </GridItem> */}
        </Grid>
      </VStack>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"担当した美容師"} />
        <Select ml={5} {...register("stylistId")}>
          {stylists.map((stylist) => (
            <option key={stylist.id} value={stylist.id}>
              {stylist.name}
            </option>
          ))}
        </Select>
      </VStack>
      <VStack align={"start"} w={"90%"}>
        <TextWithOrangeTriangle text={"施術前の要望"} />
        <Textarea
          ml={5}
          placeholder="Here is a sample placeholder"
          {...register("order")}
        />
      </VStack>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"実際の施術内容"} />
        <VStack ml={5}>
          {menus.map((menu) => (
            <Checkbox
              key={menu.id}
              value={menu.id}
              colorScheme="orange"
              {...register(`treatmentedMenuIds`)}
            >
              {menu.name}
            </Checkbox>
          ))}
        </VStack>
      </VStack>
      <VStack align={"start"} w={"90%"}>
        <TextWithOrangeTriangle text={"施術時のメモ"} />
        <Textarea
          ml={5}
          placeholder="Here is a sample placeholder"
          {...register(`memo1`)}
        />
      </VStack>
    </VStack>
  );
};

type KarteTabProps = {
  karteHeaders: karteHeader[];
  selectedKarteId: string;
  onClickTab: (selectedKarteId: string) => void;
};

const KarteTab: FC<KarteTabProps> = ({
  karteHeaders,
  selectedKarteId,
  onClickTab,
}) => {
  return (
    <VStack width={"100%"} gap={0}>
      {karteHeaders.map((karteHeader) => (
        <Flex
          key={karteHeader.id}
          onClick={() => {
            onClickTab(karteHeader.id);
          }}
          width={"100%"}
          height={"2.5rem"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRight={"2px solid"}
          borderRightColor={
            karteHeader.id === selectedKarteId
              ? "brandOrange.500"
              : "brandGray.500"
          }
        >
          <Text>{formatDate(karteHeader.treatmentDay)}</Text>
        </Flex>
      ))}
    </VStack>
  );
};

type SideMenuProps = {
  karteHeaders: karteHeader[];
  selectedKarteId: string;
  onClickTab: (selectedKarteId: string) => void;
  onClickNewKarteButton: () => void;
};

const SideMenu: FC<SideMenuProps> = ({
  karteHeaders,
  selectedKarteId,
  onClickTab,
  onClickNewKarteButton,
}) => {
  return (
    <VStack
      bg={"brandGray.500"}
      borderTopLeftRadius={"1rem"}
      borderBottomLeftRadius={"1rem"}
    >
      <Button onClick={onClickNewKarteButton} bg={"brandGray.500"}>
        <HStack>
          <Text color={"brandGreen.500"} textDecoration={"underline"}>
            カルテを作る
          </Text>
          <CircleAddIcon />
        </HStack>
      </Button>
      <KarteTab
        karteHeaders={karteHeaders}
        onClickTab={onClickTab}
        selectedKarteId={selectedKarteId}
      />
    </VStack>
  );
};

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
