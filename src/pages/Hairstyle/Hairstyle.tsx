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
import { FC, useEffect, useMemo, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { customer } from "../../types/customer";
import { createApi } from "@/apis/createApi";
import { CustomerInputForm } from "@/componets/CustomerInputForm";
import { KartesList } from "@/componets/KartesList";
import { karte } from "@/types";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { Header } from "@/componets/Header";

import dummyImg from "@/assets/dummy/input.png";

const Hairstyle = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>("1");

  const images = [
    { id: "1", image: dummyImg },
    { id: "2", image: dummyImg },
    { id: "3", image: dummyImg },
  ];

  const handleImageClick = (imageId: string) => {
    setSelectedImage(imageId);
  };

  return (
    <Container alignItems={"center"} pt={"10rem"}>
      <VStack gap={"2rem"}>
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
                border={selectedImage === image.id ? "2px solid blue" : "none"} // Add border when image is selected
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
          <Link as={ReactRouterLink} to="/customers/sent">
            <Button
              mt={4}
              bg={"brandOrange.500"}
              color={"white"}
              pl={"4rem"}
              pr={"4rem"}
              borderRadius={"5rem"}
              height={"3rem"}
            >
              送信
            </Button>
          </Link>
        </Center>{" "}
      </VStack>
    </Container>
  );
};
export default Hairstyle;
