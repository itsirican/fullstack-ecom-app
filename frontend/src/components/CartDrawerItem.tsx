import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { IProduct } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";

interface IProps {
  product: IProduct;
}

const CartDrawerItem = ({ product: { id, attributes, qty } }: IProps) => {
  const { title, price, thumbnail } = attributes;
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // ** Handlers:
  const onRemoveItem = () => {
    const filtered = cartItems.filter((item) => item.id !== id);
  };

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
        py={2}
      >
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail?.data?.attributes?.url}`}
          alt={title}
          w={"80px"}
          h={"80px"}
          rounded={"full"}
          // objectFit={"cover"}
          mr={2}
          // fallbackSrc={imgFalBack}
        />
        <Stack>
          <Text fontSize={"sm"}>Title: {title}</Text>
          <Text fontSize={"sm"}>Price: ${price}</Text>
        </Stack>
        <Stack>
          <Text fontSize={"sm"}>Quantity: {qty}</Text>
          <Button
            variant={"solid"}
            colorScheme="red"
            size={"xs"}
            w={"fit-content"}
          >
            Remove
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};

export default CartDrawerItem;
