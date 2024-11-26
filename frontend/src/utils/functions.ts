import { createStandaloneToast } from "@chakra-ui/react";
import { IProduct } from "../interface";

const { toast } = createStandaloneToast();

export const addItemsToShoppingCart = (
  cartItems: IProduct[],
  product: IProduct
) => {
  const exist = cartItems.find((item) => item.id === product.id);
  if (exist) {
    toast({
      title: "Added to your Cart.",
      description: "This item already exists, the quantity will be increased.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
  }
  toast({
    title: "Added to your Cart.",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
  
  return [...cartItems, { ...product, qty: 1 }];
};

