import { Grid } from "@chakra-ui/react";
import ProductCart from "../components/ProductCart";
import { IProduct } from "../interface";
import useCustomQuery from "../hooks/useCustomQuery";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Products = () => {
  const { isLoading, data } = useCustomQuery({
    queryKey: ["products"],
    url: "/api/products?populate=thumbnail,category",
  });

  if (isLoading)
    return (
      <Grid
        margin={30}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={6}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </Grid>
    );

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
