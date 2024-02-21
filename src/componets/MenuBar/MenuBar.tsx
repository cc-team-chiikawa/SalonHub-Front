import { ChevronLeftIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { HStack, Spacer, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

export const MenuBar: FC = () => {
  return (
    <HStack
      bg={"brandOrange.100"}
      color={"brandOrange.500"}
      h={"4rem"}
      p={"1rem"}
    >
      <Link to={".."}>
        <HStack>
          <ChevronLeftIcon />
          <Text>戻る</Text>
        </HStack>
      </Link>
      <Spacer />
    </HStack>
  );
};

export default MenuBar;
