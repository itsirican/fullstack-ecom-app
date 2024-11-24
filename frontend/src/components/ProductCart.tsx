import { Button, Card, CardBody, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProduct } from "../interface";
import ProductInfos from "./ProductInfos";

interface IProps {
  product: IProduct;
}

const ProductCart = ({ product }: IProps) => {
  const { id } = product;
  const { colorMode } = useColorMode();
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <ProductInfos product={product} />
        <Button
          as={Link}
          to={`/products/${id}`}
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
      </CardBody>
    </Card>
  );
};

export default ProductCart;
