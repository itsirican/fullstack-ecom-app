export interface IProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    thumbnail?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
  };
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
