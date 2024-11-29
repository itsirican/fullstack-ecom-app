import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieService from "../../services/CookieService";

interface IRequest {
  id: number;
}

export const categoriesApiSlice = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["Categories"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  endpoints: (builder) => ({
    // ** GET
    getDashboardCategories: builder.query({
      query: () => {
        return {
          url: `/api/users/me?populate=categories`,
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.categories.map(({ id }: IRequest) => ({
                type: "Categories",
                id,
              })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),

    // ** CREATE
    createDashboardCategories: builder.mutation({
      query: ({ body }) => ({
        url: `/api/categories`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body: body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categoriesApiSlice.util.updateQueryData(
            "getDashboardCategories",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    // ** PUT
    updateDashboardCategories: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/categories/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body: { body },
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categoriesApiSlice.util.updateQueryData(
            "getDashboardCategories",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    // ** DELETE
    removeDashboardCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/api/categories/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

export default categoriesApiSlice;
export const {
  useGetDashboardCategoriesQuery,
  useUpdateDashboardCategoriesMutation,
  useCreateDashboardCategoriesMutation,
  useRemoveDashboardCategoryMutation,
} = categoriesApiSlice;
