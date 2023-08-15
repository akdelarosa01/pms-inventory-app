import ThemeService from "../../../services/ThemeService";
import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import ItemForm from "./ItemForm";

const AddItem = () => {
  const _theme = new ThemeService();

  return (
    <div>
      <Box bg={"white"} boxShadow="xs" py="1">
        <Flex px={{ base: 4 }} sx={_theme.flexDesign}>
          <HStack
            flex={{ base: 6, lg: 1 }}
            direction={"row"}
            spacing={2}
            justify={"flex-start"}
          >
            <Text sx={_theme.titleDesign}>New Item</Text>
          </HStack>
        </Flex>
      </Box>

      <ItemForm id={0} />
    </div>
  );
};

export default AddItem;
