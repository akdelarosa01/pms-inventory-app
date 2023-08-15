import ThemeService from "../../../services/ThemeService";
import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import ItemForm from "./ItemForm";
import { useParams } from "react-router-dom";

const EditItem = () => {
  const _theme = new ThemeService();
  const { id } = useParams();

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
            <Text sx={_theme.titleDesign}>Edit Item</Text>
          </HStack>
        </Flex>
      </Box>

      <ItemForm id={Number(id)} />
    </div>
  );
};

export default EditItem;
