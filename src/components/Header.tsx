import { useEffect, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import User from "../auth/User";
import profile_img from "../assets/images/profile-img.png";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Input,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import AdjustmentSubMenu from "./Menu/AdjustmentSubMenu";
import InventorySubMenu from "./Menu/InventorySubMenu";
import AxiosService from "../services/AxiosService";

interface userInfo {
  firstname: string;
  isLoggedIn: boolean;
}

const Header = ({ firstname, isLoggedIn }: userInfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const fontSz = "13px";
  const txtStyle = {
    ml: "0px",
    px: "10px",
    py: "10px",
    fontWeight: "500",
    fontSize: fontSz,
    _hover: {
      textDecoration: "none",
      color: "white",
      bg: useColorModeValue("teal.400", "teal.900"),
    },
  };

  const navLinks = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Sales",
      href: "/sales",
    },
    {
      name: "Inventory",
      href: "/",
    },
    {
      name: "Adjustments",
      href: "/",
    },
    {
      name: "Items",
      href: "/items",
    },
  ];

  const subNavLinks = [
    {
      menu: "Inventory",
      name: "Inventory List",
      href: "/inventories",
    },
    {
      menu: "Inventory",
      name: "Add Inventory",
      href: "/inventories/create",
    },
    {
      menu: "Inventory",
      name: "Inventory History",
      href: "/inventory-history",
    },
    {
      menu: "Adjustments",
      name: "Stock In",
      href: "/stock-in",
    },
    {
      menu: "Adjustments",
      name: "Return Stocks",
      href: "/return-stocks",
    },
  ];

  useEffect(() => {}, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  const handleLogout: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const loginCredentials = {
      id: formData.get("userID"),
    };

    AxiosService.post("/logout", loginCredentials)
      .then((response) => {
        console.log(response);
        User.Logout();
      })
      .finally(() => {});
  };

  return (
    <>
      <Box
        bg={useColorModeValue("teal.200", "teal.700")}
        px={4}
        h={10}
        boxShadow="base"
        color="blackAlpha.700"
      >
        <Flex h={10} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            ref={btnRef}
            colorScheme="teal.200"
            color="blackAlpha.700"
          />
          <HStack spacing={4} alignItems={"center"}>
            <Box>
              <Text sx={{ fontWeight: "700" }}>PMS Inventory</Text>
            </Box>
            <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
              {navLinks.map((a, i) =>
                a.name != "Inventory" && a.name != "Adjustments" ? (
                  <Link key={i} to={a.href}>
                    <Text sx={txtStyle} key={i}>
                      {a.name}
                    </Text>
                  </Link>
                ) : a.name == "Inventory" ? (
                  <Menu key={i}>
                    <MenuButton key={i} sx={txtStyle}>
                      {a.name} <ChevronDownIcon />
                    </MenuButton>
                    <InventorySubMenu
                      fontSize={fontSz}
                      subMenu={subNavLinks}
                      menuName={a.name}
                    />
                  </Menu>
                ) : (
                  <Menu key={i}>
                    <MenuButton key={i} sx={txtStyle}>
                      {a.name} <ChevronDownIcon />
                    </MenuButton>
                    <AdjustmentSubMenu
                      fontSize={fontSz}
                      subMenu={subNavLinks}
                      menuName={a.name}
                    />
                  </Menu>
                )
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                borderRadius={"0px"}
                px={3}
                py={"3px"}
                sx={{
                  fontWeight: "500",
                  fontSize: fontSz,
                  _hover: {
                    textDecoration: "none",
                    color: "white",
                    bg: useColorModeValue("teal.400", "teal.900"),
                  },
                }}
              >
                <Stack direction={"row"} spacing={2}>
                  <Avatar size={"sm"} src={profile_img} />
                  <Text
                    sx={{
                      ml: "0px",
                      px: "10px",
                      py: "8px",
                      fontWeight: "500",
                      fontSize: fontSz,
                    }}
                  >
                    {firstname}
                  </Text>
                </Stack>
              </MenuButton>
              <MenuList fontSize={fontSz}>
                <form onSubmit={handleLogout}>
                  <MenuItem type="submit">
                    <Input type="hidden" name="userID" value={User.id} />
                    Logout
                  </MenuItem>
                </form>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Stack as={"nav"} display={{ md: "flex" }} p={0}>
              {navLinks.map((a, i) =>
                a.name != "Inventory" ? (
                  <Link key={i} to={a.href}>
                    <Text
                      sx={{
                        ml: "0px",
                        px: "10px",
                        py: "10px",
                        fontWeight: "500",
                        fontSize: fontSz,
                        _hover: {
                          textDecoration: "none",
                          color: "teal.500",
                        },
                      }}
                    >
                      {a.name}
                    </Text>
                  </Link>
                ) : (
                  <Menu key={i}>
                    <MenuButton
                      key={i}
                      sx={{
                        ml: "0px",
                        px: "10px",
                        py: "10px",
                        fontWeight: "500",
                        fontSize: fontSz,
                        _hover: {
                          textDecoration: "none",
                          color: "teal.500",
                        },
                      }}
                    >
                      Inventory <ChevronDownIcon />
                    </MenuButton>
                    <MenuList fontSize={fontSz}>
                      <MenuItem as={Link} to="/inventories">
                        Inventory List
                      </MenuItem>
                      <MenuItem>Adjustments</MenuItem>
                    </MenuList>
                  </Menu>
                )
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
