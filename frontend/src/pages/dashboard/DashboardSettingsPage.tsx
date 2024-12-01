import {
  Heading,
  Avatar,
  Center,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

const DashboardSettingsPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Center py={6} flexDirection={"column"}>
        <Flex
          justify={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          mb={"20px"}
        >
          <Avatar
            size={"xl"}
            cursor={"pointer"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
            onClick={() => console.log("clicked")}
          />
          <Heading
            fontSize={"2xl"}
            fontWeight={500}
            fontFamily={"body"}
            mt={"10px"}
          >
            Username
          </Heading>
        </Flex>

        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Admin Profile
        </Heading>
        <FormControl mt="2%">
          <FormLabel htmlFor="email" fontWeight={"normal"}>
            Email address
          </FormLabel>
          <Input id="email" type="email" disabled />
          <FormHelperText>We&apos;ll never share your email.</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
            Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
            New Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem"></InputRightElement>
          </InputGroup>
        </FormControl>
        <Button mt={"20px"} mx={"auto"} colorScheme="green">
          Submit
        </Button>
      </Center>
    </>
  );
};

export default DashboardSettingsPage;
