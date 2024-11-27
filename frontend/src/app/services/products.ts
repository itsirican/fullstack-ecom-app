import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";

interface IRequest {
  id: number;
}

export const productsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/users/me?populate[products][populate]=category,thumbnail&pagination[page]=${page}&pagination[pageSize]=7`,
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }: IRequest) => ({
                type: "Products" as const,
                id,
              })),
              "Products",
            ]
          : ["Products"],
    }),
    removeDashboardProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/api/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export default productsApiSlice;
export const {
  useGetDashboardProductsQuery,
  useRemoveDashboardProductMutation,
} = productsApiSlice;
