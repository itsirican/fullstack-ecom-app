import { Flex, Skeleton, Stack } from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <Stack maxInlineSize={"100%"} mx={"auto"} my={10}>
      {Array.from({ length: 6 }, (_, idx) => (
        <Flex
          key={idx}
          alignItems={"center"}
          justifyContent={"space-between"}
          border={"1px solid #333"}
          h={"50px"}
          rounded={"md"}
          p={2}
          gap={1}
        >
          <Skeleton h="9px" w={"calc(80% / 5)"} bg={"gray"} />
          <Skeleton h="9px" w={"calc(80% / 5)"} bg={"gray"} />
          <Skeleton h="9px" w={"calc(80% / 5)"} bg={"gray"} />
          <Skeleton h="9px" w={"calc(80% / 5)"} bg={"gray"} />
          <Flex w={"calc(80% / 5)"} maxW={"100px"} flex={1} ml={2}>
            <Skeleton
              h="30px"
              w={"calc(80% / 2)"}
              startColor="red.300"
              endColor="red.500"
              mr={2}
            />
            <Skeleton
              h="30px"
              w={"calc(80% / 2)"}
              startColor="blue.300"
              endColor="blue.500"
            />
          </Flex>
        </Flex>
      ))}
      <Skeleton h={15} w={"50%"} maxW={"250px"} bg={"gray"} mx={"auto"} />
    </Stack>
  );
};

export default TableSkeleton;
