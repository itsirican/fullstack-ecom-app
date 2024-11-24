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
