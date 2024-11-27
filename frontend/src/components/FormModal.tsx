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
} from "@chakra-ui/react";
import CustomModel from "../shared/Modal";
import { IAdminProduct } from "../interface";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { defaultProductObj } from "../data";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  isOpen: boolean;
  onCloseModal: () => void;
  clickedProduct: IAdminProduct;
}

const FormModal = ({ isOpen, onCloseModal, clickedProduct }: IProps) => {
  const [productToUpdate, setProductToUpdate] =
    useState<IAdminProduct>(defaultProductObj);
  // const [isValid, setIsValid] = useState(false);

  const { register, handleSubmit, reset } = useForm<IAdminProduct>();
  useEffect(() => {
    if (isOpen) reset(clickedProduct);
  }, [isOpen]);
  // console.log(clickedProduct);

  // console.log(productToEdit);
  // ** Handlers:
  // const onSubmit = handleSubmit((data) => {
  //   console.log(data);
  // });
  // useEffect(() => {
  //   setProductToEdit(clickedProduct);
  // }, [clickedProduct]);

  // console.log("received product:", productToEdit);
  // const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setProductToEdit((prev) => ({ ...prev, [name]: value }));
  //   console.log(productToEdit);
  // }, []);

  const onSubmit: SubmitHandler<IAdminProduct> = async (data) => {
    setProductToUpdate(data);
  };

  return (
    <CustomModel
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Update Product"
      okTxt="Update"
      onOkHandler={handleSubmit(onSubmit)}
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
          <Input
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
