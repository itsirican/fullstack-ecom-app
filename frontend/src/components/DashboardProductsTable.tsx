import {
  Button,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import TableSkeleton from "./TableSkeleton";
import { useGetDashboardProductsQuery } from "../app/services/apiSlice";
import { IProduct } from "../interface";
import imgFalBack from "../assets/img-placeholder.png";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const DashboardProductsTable = () => {
  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  // console.log(data);
  if (isLoading) return <TableSkeleton />;

  return (
    <TableContainer
      maxW={"100%"}
      mx={"auto"}
      css={{
        "&::-webkit-scrollbar": {
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: `${useColorModeValue("#2d3748", "#0987a0")}`,
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: `${useColorModeValue("#2d37ff", "#0987cd")}`,
        },
      }}
    >
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>ID</Th>
            <Th>TITLE</Th>
            <Th>CATEGORY</Th>
            <Th>THUMBNAIL</Th>
            <Th isNumeric>PRICE</Th>
            <Th isNumeric>STOCK</Th>
            <Th>ACTION</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((item: IProduct) => (
            <Tr key={item.id}>
              <Td isNumeric>{item.id}</Td>
              <Td>{item.attributes.title}</Td>
              <Td>{item.attributes.category.data.attributes.title}</Td>
              <Td>
                <Image
                  src={`${import.meta.env.VITE_SERVER_URL}${item.attributes.thumbnail?.data?.attributes?.url}`}
                  alt={item.attributes.title}
                  w={"80px"}
                  h={"80px"}
                  rounded={"full"}
                  // objectFit={"cover"}
                  fallbackSrc={imgFalBack}
                />
              </Td>
              <Td isNumeric>{item.attributes.price}</Td>
              <Td isNumeric>{item.attributes.stock}</Td>
              <Td>
                <Button
                  as={Link}
                  to={`/products/${item.id}`}
                  colorScheme="purple"
                  variant={"solid"}
                  mr={3}
                  onClick={() => {}}
                >
                  <AiOutlineEye size={17} />
                </Button>
                <Button
                  colorScheme="red"
                  variant={"solid"}
                  mr={3}
                  onClick={() => {}}
                >
                  <BsTrash size={17} />
                </Button>
                <Button
                  colorScheme="blue"
                  variant={"solid"}
                  mr={3}
                  onClick={() => {}}
                >
                  <FiEdit size={17} />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th isNumeric>ID</Th>
            <Th>TITLE</Th>
            <Th>CATEGORY</Th>
            <Th>THUMBNAIL</Th>
            <Th isNumeric>PRICE</Th>
            <Th isNumeric>STOCK</Th>
            <Th>ACTION</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default DashboardProductsTable;
