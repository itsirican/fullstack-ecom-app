import { ILoginInput } from "../interface";

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "identifier",
    type: "email",
    placeholder: "Email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    validation: {
      required: true,
    },
  },
];

export const defaultProductObj = {
  id: 0,
  title: "",
  description: "",
  price: 0,
  stock: 0,
  category: {
    title: "",
  },
  thumbnail: {
    url: "",
  },
};
