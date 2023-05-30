import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const twitterApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["profile", "post"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ name, email, password, username }) => ({
        url: "api/register",
        method: "POST",
        body: { name, email, password, username },
      }),
    }),

    checkCurrentUser: builder.query({
      query: ({}) => ({
        url: "api/currentUser",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),

    getAlluser: builder.query({
      query: ({}) => ({
        url: "api/getAllUser",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    fetchUserDetails: builder.query({
      query: (userId) => ({
        url: `api/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ name, username, bio, profileImage, coverImage, id }) => ({
        url: "api/updateUser",
        method: "PATCH",
        body: { name, username, bio, profileImage, coverImage, id },
      }),
      invalidatesTags: ["profile"],
    }),

    createPost: builder.mutation({
      query: ({ body, userId }) => ({
        url: "api/post",
        method: "POST",
        body: { body, userId },
      }),
      invalidatesTags: ["post"],
    }),

    getAllPost: builder.query({
      query: ({ url }) => ({
        url,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    followUser: builder.mutation({
      query: ({ currentUser, userId }) => ({
        url: "api/follow",
        method: "POST",
        body: { userId, currentUser },
      }),
      invalidatesTags: ["profile"],
    }),
    unfollowUser: builder.mutation({
      query: ({ currentUser, userId }) => ({
        url: "api/follow",
        method: "DELETE",
        body: { userId, currentUser },
      }),
      invalidatesTags: ["profile"],
    }),
    likePost: builder.mutation({
      query: ({ currentUser, postId }) => ({
        url: "api/like",
        method: "POST",
        body: { postId, currentUser },
      }),
      invalidatesTags: ["post"],
    }),
    unLikePost: builder.mutation({
      query: ({ currentUser, postId }) => ({
        url: "api/like",
        method: "DELETE",
        body: { postId, currentUser },
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterUserMutation,
  useCheckCurrentUserQuery,
  useGetAlluserQuery,
  useFetchUserDetailsQuery,
  useUpdateUserProfileMutation,
  useCreatePostMutation,
  useGetAllPostQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useLikePostMutation,
  useUnLikePostMutation,
} = twitterApi;
