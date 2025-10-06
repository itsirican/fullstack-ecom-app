import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { IProduct } from "../interface";
import imgFalBack from "../assets/img-placeholder.png";

interface IProps {
  product: IProduct;
}

const ProductInfos = ({ product: { attributes } }: IProps) => {
  const { title, description, price, thumbnail } = attributes;
  return (
    <Box>
      <Image
        src={`https://fullstack-ecom-app-1.onrender.com${thumbnail?.data?.attributes?.url}`}
        alt={title}
        boxSize={"200px"}
        borderRadius={"full"}
        mx={"auto"}
        fallbackSrc={imgFalBack}
      />
      <Stack mt="6" spacing="3" height={"265px"}>
        <Heading size="md" textAlign={"center"} mb={2} as={"h1"}>
          {title}
        </Heading>
        <Text fontSize={"large"}>{description}</Text>
        <Text color="blue.600" fontSize="3xl" textAlign={"center"}>
          ${price}
        </Text>
      </Stack>
    </Box>
  );
};

export default ProductInfos;
