import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import CustomModel from "../shared/Modal";
import { ICategory } from "../interface";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateDashboardCategoriesMutation } from "../app/services/products";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryFormSchema } from "../validation";

interface IProps {
  isOpen: boolean;
  onCloseModal: () => void;
  clickedCategory: ICategory;
}

const UpdateCategoryModal = ({
  isOpen,
  onCloseModal,
  clickedCategory,
}: IProps) => {
  const [updateCategory, { isLoading, isSuccess }] =
    useUpdateDashboardCategoriesMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(categoryFormSchema),
  });

  useEffect(() => {
    if (isOpen) reset(clickedCategory);
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      reset(clickedCategory);
      onCloseModal();
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<ICategory> = async (data: ICategory) => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
      })
    );
    updateCategory({ id: data.id, body: formData });
  };
  // if (isLoadingCategories) return;
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Update Category"
      okTxt="Update"
      onOkHandler={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="title" isInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            {...register("title", { required: true })}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
      </Box>
    </CustomModel>
  );
};

export default UpdateCategoryModal;
