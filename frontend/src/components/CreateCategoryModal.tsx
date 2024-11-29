import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import CustomModel from "../shared/Modal";
import { ICategory } from "../interface";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateDashboardCategoriesMutation,
  useUpdateDashboardCategoriesMutation,
} from "../app/services/products";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryFormSchema } from "../validation";
import { defaultCategoryObj } from "../data";
import CookieService from "../services/CookieService";

interface IProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const CreateCategoryModal = ({ isOpen, onCloseModal }: IProps) => {
  const [createCategory, { isLoading, isSuccess }] =
    useCreateDashboardCategoriesMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(categoryFormSchema),
  });

  useEffect(() => {
    if (isOpen) reset(defaultCategoryObj);
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      reset(defaultCategoryObj);
      onCloseModal();
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<ICategory> = async (data: ICategory) => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        user: CookieService.get("id"),
      })
    );
    createCategory({ id: data.id, body: formData });
  };
  // if (isLoadingCategories) return;
  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Add New Category"
      okTxt="Done"
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

export default CreateCategoryModal;
