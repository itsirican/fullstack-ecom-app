import * as yup from "yup";

export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup.string().required("Password is required."),
  })
  .required();

export const productFormSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().trim().required("Title is required."),
  description: yup.string().trim().required("Description is required."),
  price: yup.number().positive().required("Price is required"),
  stock: yup.number().positive().required("Stock is required"),
});
