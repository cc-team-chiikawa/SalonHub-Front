import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link as ReactRouterLink } from "react-router-dom";
import {
  Container,
  VStack,
  Box,
  Text,
  Input,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";
import { AbsoluteCenter } from "@chakra-ui/react";
import { createApi } from "@/apis/createApi";
import { colors } from "@/theme";
import MenuBar from "@/componets/MenuBar/MenuBar";
import { loginInformation } from "@/types";

export const SelectCustomer: FC = () => {
  const navigate = useNavigate();
  const api = useMemo(createApi, []);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid },
  } = useForm<loginInformation>();

  const onSubmit = async (data: loginInformation) => {
    const { id } = await api.customer.login(data);
    if (id !== undefined) {
      navigate(`/customers/${id}`);
    } else {
      // TODO
    }
  };

  return (
    <Container maxW="none" p={0} h="100%">
      <MenuBar />
      <Container maxW="none" p="2rem" bg={colors.bgAll} h="100%">
        <VStack gap="2rem" bg={colors.bgMain} p="1rem" borderRadius="1rem">
          <Text fontSize="1.5rem" fontWeight="bold">
            お客様の種類の選択
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="2rem">
              <Box width="25rem">
                <Text>会員番号</Text>
                <Input
                  type="text"
                  {...register("cardNumber", {
                    required: "This is required",
                  })}
                />
              </Box>
              <Box width="25rem">
                <Text>お客様の生年月日</Text>
                <Input
                  type="date"
                  {...register("birthday", {
                    required: "This is required",
                  })}
                />
              </Box>
              <Button
                mt={4}
                bg={colors.bgButton}
                color={colors.fgButton}
                isLoading={isSubmitting}
                type="submit"
                isDisabled={!isValid}
                pl="4rem"
                pr="4rem"
                borderRadius="5rem"
                height="3rem"
              >
                既存のお客様で作成
              </Button>
            </VStack>
          </form>
          <Link as={ReactRouterLink} to="/customers/new-karte">
            <Box position="relative" padding="10" width="100%">
              <Divider borderWidth="1px" borderColor={colors.border} />
              <AbsoluteCenter bg="white" px="4" width="5rem">
                または
              </AbsoluteCenter>
            </Box>
            <Button
              mt={4}
              bg={colors.bgButton}
              color={colors.fgButton}
              type="submit"
              pl="4rem"
              pr="4rem"
              borderRadius="5rem"
              height="3rem"
            >
              新規のお客様で作成
            </Button>
          </Link>
        </VStack>
      </Container>
    </Container>
  );
};

export default SelectCustomer;
