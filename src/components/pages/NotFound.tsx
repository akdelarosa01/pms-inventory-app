import { Link } from "react-router-dom";
import {
  Flex,
  Stack,
  useColorModeValue,
  Text,
  Button,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={4} mx={"auto"} maxW={"xl"} py={10} px={6}>
        <Card>
          <CardHeader>
            <Heading size="md">Page Not Found</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              The page you are accessing is not found. Please go back to the
              dashboard page.
            </Text>
          </CardBody>
          <CardFooter>
            <Button
              as={Link}
              colorScheme="teal"
              variant={"outline"}
              size="sm"
              borderRadius={"0px"}
              to="/dashboard"
            >
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </Stack>
    </Flex>
  );
};

export default NotFound;
