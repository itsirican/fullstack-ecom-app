import { Grid } from "@chakra-ui/react";
import ProductCart from "../components/ProductCart";
import axios from "axios";
import { IProduct } from "../interface";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=thumbnail,category`
    );

    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductList(),
  });

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      gap={6}
    >
      {data.data.map((product: IProduct) => {
        return <ProductCart key={product.id} product={product} />;
      })}
    </Grid>
  );
};

export default Products;
