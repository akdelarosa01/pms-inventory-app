import { useColorModeValue } from "@chakra-ui/react";

class ThemeService {
  // Design variables
  flexDesign = {
    borderStyle: "solid",
    borderColor: useColorModeValue("gray.200", "gray.900"),
    align: "center",
  };

  titleDesign = {
    fontFamily: "heading",
    fontWeight: 500,
    minW: "130px",
  };

  containerDesign = {
    padding: "30px",
    borderStyle: "solid",
    borderColor: useColorModeValue("gray.400", "gray.900"),
    mt: 2,
    maxW: "8xl",
  };

  boxFlexDesign = {
    base: 3,
    lg: 3,
  };

  errorMsgDesign = {
    fontSize: 11,
    mt: 0,
  };

  titleFormFont = {
    fontSize: "18px",
    fontWeight: 700,
  };
}

export default ThemeService;
