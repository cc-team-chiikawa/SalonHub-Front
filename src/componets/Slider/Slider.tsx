import {
  Box,
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

type sliderProps = {
  value: number;
  onChange: (val: number) => void;
  isReadOnly: boolean;
};

export const Slider: FC<sliderProps> = ({ value, onChange, isReadOnly }) => {
  return (
    <Box width={300}>
      <ChakraSlider
        isReadOnly={isReadOnly}
        defaultValue={value}
        min={1}
        max={5}
        step={1}
        onChange={(val) => onChange(val)}
      >
        <SliderTrack height={3} borderRadius={5} bg={"brandOrange.100"}>
          <SliderFilledTrack bg={"brandOrange.500"} />
        </SliderTrack>
      </ChakraSlider>
    </Box>
  );
};

type sliderWithTextProps = {
  value: number;
  valueToText: (val: number) => string;
  onChange: (val: number) => void;
  isReadOnly: boolean;
};

export const SliderWithText: FC<sliderWithTextProps> = (props) => {
  return (
    <HStack>
      <Slider {...props} />
      <Text pt={2} pl={2}>
        {props.valueToText(props.value)}
      </Text>
    </HStack>
  );
};
