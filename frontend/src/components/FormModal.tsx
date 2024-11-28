import {
  Box,
  Button,
  FormControl,
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

interface IProps {
  isOpen: boolean;
  onCloseModal: () => void;
  clickedProduct: IAdminProduct;
}

const FormModal = ({ isOpen, onCloseModal, clickedProduct }: IProps) => {
  const [updateProduct, { isLoading, isSuccess }] =
    useUpdateDashboardProductsMutation();
  const { register, handleSubmit, reset } = useForm<IAdminProduct>();
  useEffect(() => {
    if (isOpen) reset(clickedProduct);
    else if (isSuccess) {
      reset(clickedProduct);
      onCloseModal();
    }
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
    console.log(data);
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

    // console.log(formData);
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
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            {...register("title", { required: true })}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            rows={5}
            placeholder="Product Description"
            {...register("description", { required: true })}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput defaultValue={15} precision={2} step={0.2}>
            <NumberInputField {...register("price", { required: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Stock</FormLabel>
          <NumberInput precision={2} step={1}>
            <NumberInputField {...register("stock", { required: true })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            id="thumbnail.url"
            accept="image/png, image/gif, image/jpge"
            h={"full"}
            p={2}
            {...register("thumbnail")}
          />
        </FormControl>
        <Button type="submit">Submit</Button>
      </Box>
    </CustomModel>
  );
};

export default FormModal;
