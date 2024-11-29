import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import CustomModel from "../shared/Modal";
import { IAdminProduct } from "../interface";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateDashboardProductsMutation } from "../app/services/products";
import { yupResolver } from "@hookform/resolvers/yup";
import { productFormSchema } from "../validation";

interface IProps {
  isOpen: boolean;
  onCloseModal: () => void;
  clickedProduct: IAdminProduct;
}

const FormModal = ({ isOpen, onCloseModal, clickedProduct }: IProps) => {
  const [updateProduct, { isLoading, isSuccess }] =
    useUpdateDashboardProductsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAdminProduct>({
    resolver: yupResolver(productFormSchema),
  });

  useEffect(() => {
    if (isOpen) reset(clickedProduct);
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      reset(clickedProduct);
      onCloseModal();
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<IAdminProduct> = async (
    data: IAdminProduct
  ) => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
      })
    );
    if (data?.thumbnail) {
      formData.append("files.thumbnail", data.thumbnail[0]);
    }
    updateProduct({ id: data.id, body: formData });
  };

  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Update Product"
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
        <FormControl my={3} id="description" isInvalid={!!errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea
            rows={5}
            placeholder="Product Description"
            {...register("description", { required: true })}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my={3} id="price" isInvalid={!!errors.price}>
          <FormLabel>Price</FormLabel>
          <NumberInput defaultValue={15} precision={2} step={0.2}>
            <NumberInputField {...register("price", { required: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my={3} id="stock" isInvalid={!!errors.stock}>
          <FormLabel>Stock</FormLabel>
          <NumberInput precision={2} step={1}>
            <NumberInputField {...register("stock", { required: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my={3} id="thumbnail.url">
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            // id="thumbnail.url"
            accept="image/png, image/gif, image/jpge"
            h={"full"}
            p={2}
            {...register("thumbnail")}
          />
        </FormControl>
      </Box>
    </CustomModel>
  );
};

export default FormModal;
