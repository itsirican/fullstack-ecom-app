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
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IAdminProduct } from "../interface";
import { memo } from "react";
import imgFalBack from "../assets/img-placeholder.png";

interface IProps {
  products: IAdminProduct[];
}

const ProductTable = ({ products }: IProps) => {
  return (
    <TableContainer
      maxW={"100%"}
      mx={"auto"}
      css={{
        "&::-webkit-scrollbar": {
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#0987a0",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#0987cd",
        },
      }}
    >
      <Table variant="simple">
        <TableCaption>Products Total: {products.length ?? 0}</TableCaption>
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
          {products.map((product: IAdminProduct) => (
            <Tr key={product.id}>
              <Td isNumeric>{product.id}</Td>
              <Td>{product.title}</Td>
              <Td>{product.category.title}</Td>
              <Td>
                <Image
                  src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail?.url}`}
                  alt={product.title}
                  w={"80px"}
                  h={"80px"}
                  rounded={"full"}
                  // objectFit={"cover"}
                  fallbackSrc={imgFalBack}
                />
              </Td>
              <Td isNumeric>{product.price}</Td>
              <Td isNumeric>{product.stock}</Td>
              <Td>
                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  colorScheme="purple"
                  variant={"solid"}
                  mr={3}
                  target="_blank"
                  onClick={() => {}}
                >
                  <AiOutlineEye size={17} />
                </Button>
                <Button
                  colorScheme="red"
                  variant={"solid"}
                  mr={3}
                  // onClick={() => {
                  //   onOpen();
                  //   setSelectedProductId(product.id);
                  // }}
                >
                  <BsTrash size={17} />
                </Button>
                <Button
                  colorScheme="blue"
                  variant={"solid"}
                  mr={3}
                  // onClick={() => {
                  //   setProductToEdit(product);
                  //   onOpenModal();
                  // }}
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

export default memo(ProductTable);
