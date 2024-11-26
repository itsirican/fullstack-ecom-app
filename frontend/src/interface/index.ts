export interface IProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    stock: number;
    category: {
      data: {
        attributes: {
          title: string;
        };
      };
    };
    thumbnail?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
  };
  qty: number;
}

export interface ILoginCredentials {
  identifier: string;
  password: string;
}

export interface ILoginInput {
  name: string;
  type: string;
  placeholder: string;
  validation: {
    required: boolean;
    pattern?: RegExp;
  };
}

export interface IDataResponse {
  payload: any;
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface IErrorResponse {
  // details?: {
  //   error: {
  //     message: string;
  //   }[];
  // };
  message?: string;
}
