import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { NavLink as RouterLink } from "react-router-dom";
import CookieService from "../services/CookieService";
import { AppDispatch, RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setOnOpenDrawerAction } from "../app/features/cartDrawerSlice";
interface IProps {
  children: React.ReactNode;
}

const Links: string[] = ["Products", "About"];

const NavLink = ({ children }: IProps) => {
  return (
    <Box
      as={RouterLink}
      to={`${String(children).toLowerCase()}`}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookieService.get("jwt");
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  // ** Handlers:
  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };

  const onOpenDrawerHandler = () => {
    dispatch(setOnOpenDrawerAction());
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <RouterLink to={"/"}>Logo</RouterLink>
            {Links && Links.map((link) => <NavLink key={link}>{link}</NavLink>)}
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoon /> : <BsSun />}
              </Button>
              <Button onClick={onOpenDrawerHandler}>
                Cart({cartItems.length})
              </Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <RouterLink to={"/login"}>Login</RouterLink>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
