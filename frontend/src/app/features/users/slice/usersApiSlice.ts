import { apiSlice } from "../../../../API/appApi";
import { User } from "../../../../types/user";

// Define the users API slice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      keepUnusedDataFor: 5,
    }),
  }),
});

// Extract the hook for querying users from the API slice
export const { useGetUsersQuery } = usersApiSlice;
