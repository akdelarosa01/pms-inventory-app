import { Outlet } from "react-router-dom";
import {
    Flex,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";

const AuthLayout = () => {
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            bgSize={'cover'}
        >
            <Stack spacing={4} mx={"auto"} maxW={"xl"} py={10} px={6}>
                <Outlet/>
            </Stack>
        </Flex>
    );
}

export default AuthLayout