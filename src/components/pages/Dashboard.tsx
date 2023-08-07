import { useEffect, useState } from "react";
import AxiosService from "../../services/AxiosService";
import MessageService from "../../services/MessageService";
import {
  Stat,
  StatLabel,
  StatNumber,
  Container,
  Box,
  Stack,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";

const Dashboard = () => {
  const [itemSkeleton, setItemSkeleton] = useState(false);
  const [rawMaterials, setRawMaterials] = useState(0);
  const [crudes, setCrudes] = useState(0);
  const [finishedGoods, setFinishedGoods] = useState(0);

  const message = new MessageService();

  const getItemsCount = async () => {
    await AxiosService.get("/items-status")
      .then(({ data }) => {
        setRawMaterials(data.raw_materials);
        setCrudes(data.crude);
        setFinishedGoods(data.finished_goods);
        setItemSkeleton(true);
      })
      .catch((err) => {
        if (err.response != undefined) {
          const errMessage = err.response.data;
          message.error(errMessage);
        }
        setItemSkeleton(true);
      })
      .finally(() => {
        setItemSkeleton(true);
      });
  };

  useEffect(() => {
    getItemsCount();
  }, []);

  return (
    <Container maxW="12xl">
      <Stack direction={["column", "row"]} spacing={3} pt={5}>
        <Box w="100%">
          <Skeleton isLoaded={itemSkeleton}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Raw Materials</StatLabel>
                  <StatNumber>{rawMaterials}</StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </Skeleton>
        </Box>
        <Box w="100%">
          <Skeleton isLoaded={itemSkeleton}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Finished Goods</StatLabel>
                  <StatNumber>{finishedGoods}</StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </Skeleton>
        </Box>
        <Box w="100%">
          <Skeleton isLoaded={itemSkeleton}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Crude Items</StatLabel>
                  <StatNumber>{crudes}</StatNumber>
                </Stat>
              </CardBody>
            </Card>
          </Skeleton>
        </Box>
        <Box w="100%"></Box>
        <Box w="100%"></Box>
        <Box w="100%"></Box>
      </Stack>
    </Container>
  );
};

export default Dashboard;
