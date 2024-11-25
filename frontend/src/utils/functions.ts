import { IProduct } from "../interface";

export const addItemsToShoppingCart = (
  cartItems: IProduct[],
  product: IProduct
) => {
  const exist = cartItems.find((item) => item.id === product.id);
  if (exist) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
  }
  return [...cartItems, { ...product, qty: 1 }];
};
