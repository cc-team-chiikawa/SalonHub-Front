import { ChevronLeftIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { HStack, Spacer, Text, Image } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { colors } from "@/theme";
import headerIcon from "@/assets/Header_Icon.png";

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
      <Image src={headerIcon} h={"4rem"} />
    </HStack>
  );
};

export default MenuBar;
