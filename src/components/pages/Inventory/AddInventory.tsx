import ThemeService from "../../../services/ThemeService";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import InventoryForm from "./InventoryForm";

const AddInventory = () => {
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
            <Text sx={_theme.titleDesign}>New Inventory Item</Text>
          </HStack>
        </Flex>
      </Box>

      <InventoryForm id={0} />
    </div>
  );
};

export default AddInventory;
