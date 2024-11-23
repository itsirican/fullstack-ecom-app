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
import { IProduct } from "../interface";

interface IProps {
  product: IProduct;
}

const ProductCart = ({ product }: IProps) => {
  const { title, description, price, thumbnail } = product.attributes;
  const { colorMode } = useColorMode();
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail?.data?.attributes?.url}`}
          alt="Green double couch with wooden legs"
          boxSize={"200px"}
          borderRadius={"full"}
          mx={"auto"}
          // objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} mb={2}>
            {title}
          </Heading>
          <Text fontSize={"large"}>{description}</Text>
          <Text color="blue.600" fontSize="3xl" textAlign={"center"}>
            ${price}
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
