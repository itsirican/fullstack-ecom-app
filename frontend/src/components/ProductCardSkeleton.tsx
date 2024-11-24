import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box border={"1px solid #a8b5c8"} bg={"none"} p={5} rounded={"lg"}>
      <SkeletonCircle boxSize={"200px"} mx={"auto"} />
      <Stack mt="6" spacing="3">
        <Skeleton width={"xs"} height={"20px"} mx={"auto"} mb={5} />
        <SkeletonText mb="2" noOfLines={6} spacing="4" skeletonHeight="2" />
        <Skeleton
          width={"sm"}
          maxWidth={"100px"}
          height={"35px"}
          mx={"auto"}
          mb={2}
        />
        <Skeleton height="55px" py={5} mt={6} />
      </Stack>
    </Box>
  );
};

export default ProductCardSkeleton;
