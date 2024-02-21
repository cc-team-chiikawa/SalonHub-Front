import { Container, Button, Link } from "@chakra-ui/react";
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
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { customer } from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { MemberInformation } from "@/componets/MemberInformation";
import { KartesList } from "@/componets/KartesList";
import { karte } from "@/types";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { Header } from "@/componets/Header";
import { keyframes } from "@emotion/react";

const fadeInFromLeftAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Sent = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // 画面を一番上にスクロールさせます
  }, []);

  return (
    <Container maxW="none" p={0} h={"100%"}>
      <MenuBar />

      <VStack
        gap={"2rem"}
        alignItems={"left"}
        marginLeft={"4rem"}
        marginTop={"12rem"}
        css={{
          animation: `${fadeInFromLeftAnimation} 1s ease-out forwards`,
        }}
      >
        <Text fontSize={"2rem"} style={{ fontStyle: "italic" }}>
          Thank you!
        </Text>
      </VStack>
      <Box
        position="absolute"
        top={"10rem"} // ここを調整して要素を下に移動させます
        left={0}
        width="100%"
        height="300%"
        style={{
          backgroundImage: `url('https://usagif.com/wp-content/uploads/gif/confetti-47.gif.webp')`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center", // Add this line to center the image
          zIndex: -1, // 新たに追加したBoxが他のBoxの下に来るようにzIndexを設定します
        }}
      />
      <Box //女性の絵
        position="absolute"
        top={"13rem"} // ここを調整して要素を下に移動させます
        left={"3rem"}
        width="100%"
        height="300%" // Change the height to "100%" to fit the image within the container
        style={{
          backgroundImage: `url('https://sozai-good.com/uploads/88032/88032_sample.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center", // Add this line to center the image
          zIndex: -2, //ボックスがzIndexが0以上の他の要素の背後に配置
        }}
        css={{
          animation: `${fadeInFromLeftAnimation} 1s ease-out forwards`,
        }}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="400%"
        style={{
          backgroundColor: "lightpink", // ここに任意の色を指定します
          zIndex: -3, // 新たに追加したBoxが他のBoxの下に来るようにzIndexを設定します
        }}
      />
    </Container>
  );
};
export default Sent;
