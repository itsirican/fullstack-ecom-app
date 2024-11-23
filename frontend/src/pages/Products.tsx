import { Grid } from "@chakra-ui/react";
import ProductCart from "../components/ProductCart";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/products")
      .then((res) => setProductList(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(productList);
  return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      gap={6}
    >
      {productList.map((product, idx) => (
        <ProductCart key={idx} {...product} />
      ))}
    </Grid>
  );
};

export default Products;
