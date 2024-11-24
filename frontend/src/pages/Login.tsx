import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import { LOGIN_FORM } from "../data";

interface IFormInput {
  identifier: string;
  password: string;
}

export default function SimpleCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  // ** Handlers:
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // console.log(data);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as="form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={4}>
            <FormControl id="identifier" isInvalid={!!errors.identifier}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={!!errors.identifier}
                errorBorderColor="crimson"
                {...register("identifier", LOGIN_FORM[0].validation)}
              />
              <FormErrorMessage>{errors.identifier?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={!!errors.password}
                  errorBorderColor="crimson"
                  {...register("password", LOGIN_FORM[1].validation)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    p={0}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={
                  errors.identifier || errors.identifier
                    ? "red.400"
                    : "blue.400"
                }
                color={"white"}
                _hover={{
                  bg:
                    errors.identifier || errors.identifier
                      ? "red.500"
                      : "blue.500",
                }}
                type="submit"
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
