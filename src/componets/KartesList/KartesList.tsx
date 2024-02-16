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
  Switch,
  Spacer,
  Image,
  Center,
  Select,
  Textarea,
  Checkbox,
  ListItem,
  UnorderedList,
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      methods.handleSubmit((data) => console.log(data))();
      // TODO: karte取得
    }

    setIsEditMode(e.target.checked);
  };

  return (
    karte &&
    stylist &&
    stylists &&
    menus && (
      <Grid templateRows="3rem 1fr" templateColumns="1fr" gap={4}>
        <GridItem rowSpan={1} colSpan={1}>
          <HStack w={"100%"}>
            <Text>あなたのカルテ</Text>
            <Spacer />
            <Switch isChecked={isEditMode} onChange={onChange} />
          </HStack>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Grid templateRows="1fr" templateColumns="10rem 1fr" gap={4}>
            <GridItem rowSpan={1} colSpan={1}>
              <SideMenu
                karteHeaders={karteHeaders}
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
                      (id) => menus.find((menu) => menu.id === id)!
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
  return (
    <VStack align={"start"} gap={4}>
      <VStack align={"start"}>
        <Text>{"施術後の写真"}</Text>
        <Grid ml={5} templateRows="1fr 1fr" templateColumns="1fr 1fr" gap={4}>
          <GridItem rowSpan={1} colSpan={1}>
            <Image
              boxSize="100px"
              src="https://picsum.photos/100?random=1"
              alt="Dan Abramov"
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image
              boxSize="100px"
              src="https://picsum.photos/100?random=2"
              alt="Dan Abramov"
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image
              boxSize="100px"
              src="https://picsum.photos/100?random=3"
              alt="Dan Abramov"
            />
          </GridItem>
        </Grid>
      </VStack>
      <VStack align={"start"}>
        <Text>{"担当した美容師"}</Text>
        <Text ml={5}>{karte.stylist.name}</Text>
      </VStack>
      <VStack align={"start"}>
        <Text>{"施術前の要望"}</Text>
        <Text ml={5}>{karte.order}</Text>
      </VStack>
      <VStack align={"start"}>
        <Text>{"施術前の要望"}</Text>
        <UnorderedList pl={5}>
          {karte.treatmentedMenus.map((menu) => (
            <ListItem key={menu.id}>{menu.name}</ListItem>
          ))}
        </UnorderedList>
      </VStack>
      <VStack align={"start"}>
        <Text>{"施術時のメモ"}</Text>
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
        <Text>{"施術後の写真"}</Text>
        <Grid ml={5} templateRows="1fr 1fr" templateColumns="1fr 1fr" gap={4}>
          <GridItem rowSpan={1} colSpan={1}>
            <Image
              boxSize="100px"
              src="https://picsum.photos/100?random=1"
              alt="Dan Abramov"
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image
              boxSize="100px"
              src="https://picsum.photos/100?random=2"
              alt="Dan Abramov"
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Image
              boxSize="100px"
              src="https://picsum.photos/100?random=3"
              alt="Dan Abramov"
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Box
              backgroundColor={"gray"}
              boxSize="100px"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Center>
                <AddIcon />
              </Center>
            </Box>
          </GridItem>
        </Grid>
      </VStack>
      <VStack align={"start"}>
        <Text>{"担当した美容師"}</Text>
        <Select ml={5} {...register("stylistId")}>
          {stylists.map((stylist) => (
            <option key={stylist.id} value={stylist.id}>
              {stylist.name}
            </option>
          ))}
        </Select>
      </VStack>
      <VStack align={"start"}>
        <Text>{"施術前の要望"}</Text>
        <Textarea
          ml={5}
          placeholder="Here is a sample placeholder"
          {...register("order")}
        />
      </VStack>
      <VStack align={"start"}>
        <Text>{"実際の施術内容"}</Text>
        <VStack ml={5}>
          {menus.map((menu) => (
            <Checkbox
              key={menu.id}
              value={menu.id}
              {...register(`treatmentedMenuIds`)}
            >
              {menu.name}
            </Checkbox>
          ))}
        </VStack>
      </VStack>
      <VStack align={"start"}>
        <Text>{"施術時のメモ"}</Text>
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
  onClickTab: (selectedKarteId: string) => void;
};

const KarteTab: FC<KarteTabProps> = ({ karteHeaders, onClickTab }) => {
  return (
    <VStack>
      {karteHeaders.map((karteHeader) => (
        <Text
          key={karteHeader.id}
          onClick={() => {
            onClickTab(karteHeader.id);
          }}
        >
          {formatDate(karteHeader.treatmentDay)}
        </Text>
      ))}
    </VStack>
  );
};

type SideMenuProps = {
  karteHeaders: karteHeader[];
  onClickTab: (selectedKarteId: string) => void;
  onClickNewKarteButton: () => void;
};

const SideMenu: FC<SideMenuProps> = ({
  karteHeaders,
  onClickTab,
  onClickNewKarteButton,
}) => {
  return (
    <VStack>
      <Button onClick={onClickNewKarteButton}>
        <HStack>
          <Text>カルテを作る</Text>
          <AddIcon />
        </HStack>
      </Button>
      <KarteTab karteHeaders={karteHeaders} onClickTab={onClickTab} />
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
