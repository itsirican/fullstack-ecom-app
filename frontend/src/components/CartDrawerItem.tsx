import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { IProduct } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { removeFromCartAction } from "../app/features/cartSlice";
import { BsTrash } from "react-icons/bs";

interface IProps {
  product: IProduct;
}

const CartDrawerItem = ({ product: { id, attributes, qty } }: IProps) => {
  const { title, price, thumbnail } = attributes;
  const dispatch = useDispatch<AppDispatch>();

  // ** Handlers:

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
        py={2}
      >
        <Image
          src={`https://fullstack-ecom-app-1.onrender.com${thumbnail?.data?.attributes?.url}`}
          alt={title}
          w={"80px"}
          h={"80px"}
          rounded={"full"}
          objectFit={"cover"}
          mr={2}
        />
        <Stack>
          <Text fontSize={"sm"}>Title: {title}</Text>
          <Text fontSize={"sm"}>Price: ${price}</Text>
        </Stack>
        <Stack>
          <Text fontSize={"sm"}>Quantity: {qty}</Text>

          <Button
            leftIcon={<BsTrash />}
            variant={"outline"}
            colorScheme="red"
            size={"xs"}
            w={"fit-content"}
            onClick={() => dispatch(removeFromCartAction(id))}
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
