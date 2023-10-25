import { ReactNode, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  useClipboard,
} from "@chakra-ui/react";

// import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { RiCopperCoinFill } from "react-icons/ri";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Nav(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    updateAddress();
  }, [props.account]);

  const updateAddress = () => {
    setValue(props.account);
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize="2xl" fontWeight="700">
              Bank App
            </Text>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              {props.account ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    cursor={"pointer"}
                    minW={0}
                    onClick={() => props.checkBallence()}
                  >
                    <Button rounded={"full"} colorScheme="teal" variant="ghost">
                      <RiCopperCoinFill /> {props.balance ? props.balance : 0}
                    </Button>
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
                    <Center pl={4}>
                      <Text as="span" noOfLines={1} maxWidth={"200px"}>
                        {props.account}
                      </Text>
                      <Button
                        onClick={onCopy}
                        colorScheme="teal"
                        variant="ghost"
                      >
                        <MdOutlineContentCopy />
                      </Button>
                    </Center>
                    <br />
                    {/* <MenuDivider /> */}
                    <MenuItem>
                      Balance: {props.balance ? props.balance : 0}{" "}
                      <HiOutlineRefresh onClick={() => props.checkBallence()} />
                    </MenuItem>
                    <MenuItem onClick={() => props.logout()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button
                  onClick={() => props.connectWallet()}
                  colorScheme="teal"
                  size="md"
                >
                  Connect wallet
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
