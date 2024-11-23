import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCart = (product) => {
  const { attributes } = product;
  const { colorMode } = useColorMode();
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          boxSize={"200px"}
          borderRadius={"full"}
          mx={"auto"}
          // objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} mb={2}>
            {attributes.title}
          </Heading>
          <Text fontSize={"large"}>{attributes.description}</Text>
          <Text color="blue.600" fontSize="3xl" textAlign={"center"}>
            ${attributes.price}
          </Text>
          <Button
            as={Link}
            to={`/products/1`}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "9f7aea"}
            size={"xl"}
            variant={"outline"}
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "tranparent",
            }}
            mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCart;
