import { Container, Button, Link } from "@chakra-ui/react";
import {
  Heading,
  Box,
  Text,
  Image,
  Center,
  Wrap,
  WrapItem,
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
import { FC, Suspense, useEffect, useMemo, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { customer } from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { MemberInformation } from "@/componets/MemberInformation";
import { KartesList } from "@/componets/KartesList";
import { karte } from "@/types";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { Header } from "@/componets/Header";

import dummyImg from "@/assets/dummy/input.png";
import { colors } from "@/theme";
import { useMyContext } from "@/MyContext";
import { Customer } from "../Customer";

const Hairstyle = () => {
  const [styles, setStyles] = useState<Array<string | undefined>>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>("");
  const [selectedImage, setSelectedImage] = useState<string | null>("1");
  // const prompt = []; フロント実装
  const postData = {
    // テスト用のダミーデータ
    tags: [],
  };
  const devURI: string = "http://34.206.149.92:3000";

  const context = useMyContext();
  const { customer } = context;

  async function fetchImage(postData: object) {
    try {
      const response = await fetch(devURI + "/api/image/new", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(postData), // ボディにデータをJSON形式で設定
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (err) {
      console.error("Fetch Error = ", err);
    }
  }

  const images = [
    // { id: "1", image: dummyImg },
    // { id: "2", image: dummyImg },
    // { id: "3", image: dummyImg },
  ];

  const handleImageClick = (imageId: string) => {
    setSelectedImage(imageId);
  };

  useEffect(() => {
    //// APIコスト節約のため一時コメントアウト ////
    Promise.all([
      fetchImage(postData),
      fetchImage(postData),
      fetchImage(postData),
    ]) //　取得したい画像枚数分引数追加　★1にした
      .then((data) => {
        setStyles(data);
      })
      .catch((err) => {
        console.error("Fetch Error = ", err);
      });
    //// 暫定遅延用 ////
    // setInterval(() => {
    //   addLoadingCount();
    // }, 3000);
  }, []);

  return (
    <Container maxW="none" p={0} h={"100%"}>
      <MenuBar />
      <Container maxW="none" p={"2rem"} bg={colors.bgAll} h={"100%"}>
        <VStack gap="2rem" bg={colors.bgMain} p="1rem" borderRadius="1rem">
          <Text fontSize={"1.5rem"} fontWeight={"bold"}>
            イメージに近い髪型を選択してください
          </Text>
          <Center flexDirection="column" p={5}>
            <Wrap spacing="30px" justify="center">
              {images.map((image) => (
                <WrapItem
                  key={image.id}
                  boxShadow="md"
                  borderRadius="lg"
                  overflow="hidden"
                  border={
                    selectedImage === image.id ? "2px solid blue" : "none"
                  } // Add border when image is selected
                  cursor="pointer"
                  onClick={() => handleImageClick(image.id)} // Call handleImageClick function on image click
                >
                  <Image
                    src={image.image}
                    boxSize="512px"
                    objectFit="cover"
                    alt={`画像 ${image.id}`}
                    _hover={{ opacity: 0.7 }}
                  />
                </WrapItem>
              ))}
            </Wrap>
            {/* できればsuspendでやりたい */}
            <Wrap spacing="30px" justify="center">
              {styles.map((style) => (
                <WrapItem
                  key={style}
                  boxShadow="md"
                  borderRadius="lg"
                  overflow="hidden"
                  border={selectedStyle === style ? "2px solid blue" : "none"} // Add border when image is selected
                  cursor="pointer"
                  onClick={() => setSelectedStyle(style)} // Call handleImageClick function on image click
                >
                  <Image
                    src={`data:image/png;base64,${style}`}
                    boxSize="512px"
                    objectFit="cover"
                    alt={`画像`}
                    _hover={{ opacity: 0.7 }}
                  />
                </WrapItem>
              ))}
            </Wrap>
            <Link as={ReactRouterLink} to="/customers/sent">
              <Button
                mt={4}
                bg={colors.bgButton}
                color={colors.fgButton}
                pl={"4rem"}
                pr={"4rem"}
                borderRadius={"5rem"}
                height={"3rem"}>
                送信
              </Button>
            </Link>
          </Center>{" "}
        </VStack>
      </Container>
    </Container>
  );
};
export default Hairstyle;
