import { Link, useNavigate, useParams } from "react-router-dom";
import useCustomQuery from "../hooks/useCustomQuery";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductInfos from "./ProductInfos";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setcartItemsAction } from "../app/features/cartSlice";

const Product = () => {
  const { id } = useParams();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, data } = useCustomQuery({
    queryKey: ["products", `${id}`],
    url: `/api/products/${id}?populate=thumbnail,category`,
  });

  if (isLoading)
    return (
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <ProductCardSkeleton />
      </Box>
    );

  document.title = `Product Store | Product ${data?.data?.attributes?.title} Page`;

  // ** Handlers:
  const GoBack = () => navigate(-1);

  const addToCartHandler = () => {
    dispatch(setcartItemsAction(data.data));
  };
  return (
    <>
      <Flex
        maxW={"sm"}
        mx={"auto"}
        mt={10}
        mb={5}
        alignItems={"center"}
        fontSize={"lg"}
        gap={2}
        cursor={"pointer"}
        onClick={GoBack}
      >
        <BsArrowLeft />
        <Text>Go Back</Text>
      </Flex>
      <Card
        maxW={"sm"}
        mx={"auto"}
        border={"1px solid #a8b5c8"}
        bg={"none"}
        mb={10}
      >
        <CardBody>
          <ProductInfos product={data.data} />
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
            textTransform={"uppercase"}
            onClick={addToCartHandler}
          >
            Add To Cart
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default Product;
