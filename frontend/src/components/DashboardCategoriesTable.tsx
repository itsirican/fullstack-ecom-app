import {
  Button,
  useDisclosure,
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
import TableSkeleton from "./TableSkeleton";
import {
  useGetDashboardCategoriesQuery,
  useRemoveDashboardCategoryMutation,
} from "../app/services/categories";

import { useEffect, useState } from "react";
import { ICategory } from "../interface";
import { defaultProductObj } from "../data";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import CustomAlertDialog from "../shared/AlertDialog";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const DashboardCategoriesTable = () => {
  const { isOnline } = useSelector((state: RootState) => state.network);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [categoryToEdit, setCategotyToEdit] = useState<ICategory>({
    ...defaultProductObj,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const { isLoading, data } = useGetDashboardCategoriesQuery({});
  const [destroyCategory, { isLoading: isDestroying, isSuccess }] =
    useRemoveDashboardCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setSelectedCategoryId(null);
      onClose();
    }
  }, [isSuccess]);

  if (isLoading || !isOnline) return <TableSkeleton />;
  return (
    <>
      <Button
        display={"flex"}
        ml={"auto"}
        mb={"10px"}
        colorScheme="green"
        onClick={() => {
          onOpenCreateModal();
        }}
      >
        Create
      </Button>
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
          <TableCaption>
            Categories Total: {data.categories.length ?? 0}
          </TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>TITLE</Th>
              <Th isNumeric>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.categories.map((category: ICategory) => (
              <Tr key={category.id}>
                <Td isNumeric>{category.id}</Td>
                <Td>{category.title}</Td>
                <Td isNumeric>
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                    onClick={() => {
                      onOpen();
                      setSelectedCategoryId(category.id);
                    }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant={"solid"}
                    onClick={() => {
                      setCategotyToEdit(category);
                      onOpenModal();
                    }}
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
              <Th isNumeric>ACTION</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title={"Are you sure?"}
        description="Do you really want to destroy this product/ This product cannot be undone."
        okTxt="Destroy"
        variant="outline"
        isLoading={isDestroying}
        onOkHandler={() => destroyCategory(selectedCategoryId)}
      />

      <UpdateCategoryModal
        clickedCategory={categoryToEdit}
        isOpen={isOpenModal}
        onCloseModal={onCloseModal}
      />
      <CreateCategoryModal
        isOpen={isOpenCreateModal}
        onCloseModal={onCloseCreateModal}
      />
    </>
  );
};

export default DashboardCategoriesTable;
