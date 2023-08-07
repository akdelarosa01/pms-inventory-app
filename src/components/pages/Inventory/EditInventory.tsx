import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ThemeService from "../../../services/ThemeService";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import InventoryForm from "./InventoryForm";

const EditInventory = () => {
  const _theme = new ThemeService();

  const { id } = useParams();
  const dataFetchedRef = useRef<boolean>(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
  });

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
            <Text sx={_theme.titleDesign}>Edit Inventory Item</Text>
          </HStack>

          <HStack
            flex={{ base: 6, lg: 2 }}
            direction={"row"}
            spacing={2}
            justify={"flex-end"}
          ></HStack>
        </Flex>
      </Box>

      <InventoryForm id={Number(id)} />
    </div>
  );
};

export default EditInventory;
