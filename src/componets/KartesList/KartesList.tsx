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
      <Accordion
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
                  <SideMenu
                    karteHeaders={karteHeaders}
                    selectedKarteId={selectedKarteId}
                    onClickTab={onClickTab}
                    onClickNewKarteButton={onClickNewKarteButton}
                  />
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <ViewModeKarteForm
                    karte={{
                      ...karte,
                      stylist,
                      treatmentedMenus: karte.treatmentedMenuIds.map(
                        (id) => menus.find((menu) => menu.id == id)! // TODO:idの型
                      ),
                    }}
                  />
                </GridItem>
              </Grid>
            </GridItem>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
        <TextWithOrangeTriangle text={"要望"} />
        <Text ml={5}>{karte.order}</Text>
      </VStack>
      <VStack align={"start"}>
        <TextWithOrangeTriangle text={"選択された生成イメージ"} />
        <Image boxSize="16rem" src={frontImg} alt="" />
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
}) => {
  return (
    <VStack
      bg={"brandGray.500"}
      borderTopLeftRadius={"1rem"}
      borderBottomLeftRadius={"1rem"}
    >
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
