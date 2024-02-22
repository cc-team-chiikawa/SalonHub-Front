import { Container, Button, Link, Text, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { colors } from "@/theme";

const MainMenuButton = ({ to, children }) => (
  <Link as={ReactRouterLink} to={to}>
    <Button
      mt={4}
      bg={colors.bgButton}
      color={colors.fgButton}
      pl={"4rem"}
      pr={"4rem"}
      borderRadius={"5rem"}
      height={"3rem"}
    >
      {children}
    </Button>
  </Link>
);

const MainMenu = () => {
  return (
    <Container maxW="none" p={0} h={"100%"}>
      <MenuBar />
      <Container maxW="none" p={"2rem"} bg={colors.bgAll} h={"100%"}>
        <VStack
          gap={"2rem"}
          bg={colors.bgMain}
          p={"1rem"}
          borderRadius={"1rem"}
        >
          <Text fontSize={"1.5rem"} fontWeight={"bold"}>
            利用者選択
          </Text>
          <MainMenuButton to="/customers/select-customer">
            お客様
          </MainMenuButton>
          <MainMenuButton to="/stylist/list">美容師</MainMenuButton>
        </VStack>
      </Container>
    </Container>
  );
};
export default MainMenu;
