import { ChevronLeftIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { HStack, Spacer, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { colors } from "@/theme";

export const MenuBar: FC = () => {
  return (
    <HStack
      bg={colors.bgMenuBar}
      color={colors.fgMenuBar}
      h={"4rem"}
      p={"1rem"}
    >
      <Link to={"/"}>
        <HStack>
          <ChevronLeftIcon />
          <Text>利用者選択に戻る</Text>
        </HStack>
      </Link>
      <Spacer />
    </HStack>
  );
};

export default MenuBar;
