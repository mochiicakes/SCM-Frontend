import React, { useState } from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  VStack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

const Home = (props) => {
  const [transferAddress, setTranferAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const sendTransferMoney = () => {
    let data = {};
    data.amount = transferAmount;
    data.address = transferAddress;
    props.transferMoney(data);
  };
  return (
    <Box>
      {!props.accountACC ? (
        <Flex
          w={"full"}
          minH={"91vh"}
          bgGradient="linear(to-l, #00DBDE, #FC00FF)"
        >
          <Container maxW={"3xl"}>
            <Stack
              as={Box}
              textAlign={"center"}
              spacing={{ base: 8, md: 14 }}
              py={{ base: 20, md: 36 }}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                Bank Dapp
                <br />
                <Text
                  fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                  lineHeight={"90%"}
                  as={"span"}
                  color={"cyan.300"}
                >
                  ~ KRITIK SAH
                </Text>
              </Heading>
              <Text color={"gray.50"}>
                {props.account
                  ? "Seems like you dont have a bank account, get one by clicking below button"
                  : "Login to access full app!"}
              </Text>
              <Stack
                direction={"column"}
                spacing={3}
                align={"center"}
                alignSelf={"center"}
                position={"relative"}
              >
                {props.account ? (
                  <Button
                    colorScheme={"green"}
                    bg={"cyan.400"}
                    rounded={"full"}
                    px={6}
                    _hover={{
                      bg: "cyan.500",
                    }}
                    onClick={() => props.createAccount()}
                  >
                    Create Account
                  </Button>
                ) : (
                  <Button
                    colorScheme={"green"}
                    bg={"cyan.400"}
                    rounded={"full"}
                    px={6}
                    _hover={{
                      bg: "cyan.500",
                    }}
                    onClick={() => props.connectWallet()}
                  >
                    Connect Wallet
                  </Button>
                )}
              </Stack>
            </Stack>
          </Container>
        </Flex>
      ) : (
        <VStack p={["2", "4", "8"]}>
          <Flex
            border="1px"
            borderColor="gray.200"
            borderRadius="10"
            boxShadow="lg"
            w={"full"}
            p={["2", "4", "8"]}
          >
            <VStack spacing="24px" w={"full"}>
              <VStack w={"full"}>
                <FormControl>
                  <FormLabel>Transfer Money</FormLabel>
                  <Input
                    value={transferAddress}
                    onChange={(e) => setTranferAddress(e.target.value)}
                    placeholder="Enter the reciver ETH address"
                  />
                  <FormHelperText>Enter the reciver ETH address</FormHelperText>
                </FormControl>
              </VStack>

              <VStack w={"full"}>
                <FormControl isRequired>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="00"
                  />
                </FormControl>
              </VStack>
              <VStack align="left" mt="8" w={"full"}>
                <Button
                  onClick={sendTransferMoney}
                  colorScheme="teal"
                  size="md"
                >
                  Send Money
                </Button>
              </VStack>
            </VStack>
          </Flex>

          <Stack direction={["column", "row"]} w="full">
            <Flex
              border="1px"
              borderColor="gray.200"
              borderRadius="10"
              boxShadow="lg"
              w={"full"}
              p={["2", "4", "8"]}
            >
              <VStack spacing="24px" w={"full"}>
                <VStack w={"full"}>
                  <FormControl isRequired>
                    <FormLabel>Deposit Amount</FormLabel>
                    <Input
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="00"
                    />
                  </FormControl>
                </VStack>
                <VStack align="left" mt="8" w={"full"}>
                  <Button
                    onClick={() => props.depositMoney(depositAmount)}
                    colorScheme="teal"
                    size="md"
                  >
                    Deposit Money
                  </Button>
                </VStack>
              </VStack>
            </Flex>
            <Flex
              border="1px"
              borderColor="gray.200"
              borderRadius="10"
              boxShadow="lg"
              w={"full"}
              p={["2", "4", "8"]}
            >
              <VStack spacing="24px" w={"full"}>
                <VStack w={"full"}>
                  <FormControl isRequired>
                    <FormLabel>Withdraw Amount</FormLabel>
                    <Input
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="00"
                    />
                  </FormControl>
                </VStack>
                <VStack align="left" mt="8" w={"full"}>
                  <Button
                    onClick={() => props.withdrawMoney(withdrawAmount)}
                    colorScheme="teal"
                    size="md"
                  >
                    Withdraw Amount
                  </Button>
                </VStack>
              </VStack>
            </Flex>
          </Stack>
        </VStack>
      )}
    </Box>
  );
};

export default Home;
