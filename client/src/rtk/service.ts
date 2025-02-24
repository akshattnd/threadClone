import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addAllPost, addMyProfile, addSinglePost, deletePost, searcUser } from './slice';
const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/",
        credentials: "include",
    }),
    keepUnusedDataFor: 3600 * 24,
    tagTypes: ["Post", "User", "Me"],
    endpoints: (builder) => ({
        // user routes
        signin: builder.mutation({
            query: (data) => ({
                url: "signin",
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Me"],
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "login",
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Me"],
        }),
        myProfile: builder.query({
            query: () => ({
                url: "profile",
                method: 'GET',
            }),
            providesTags: ["Me"],
            //@ts-ignore
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(addMyProfile(data));

                } catch (err) {
                    console.log((err instanceof Error) ? err.message : String(err));
                }

            },

        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: 'POST',

            }),
            invalidatesTags: ["Me"],
        }),
        userDetails: builder.query({
            query: (id) => ({
                url: `user/${id}`,
                method: "GET",
            }),
            // @ts-ignore
            providesTags: (result, error, { id }) => {
                return [{ type: "User", id }];
            },
            // @ts-ignore
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(searcUser(data));
                } catch (err) {
                    console.log(err);
                }
            },

        }),
        allPost: builder.query({
            query: (page) => ({
                url: `post?page=${page}`,
                method: 'GET',
            }),
            //@ts-ignore
            providesTags: (result) =>
                result
                    ? [...result.posts.map((post: any) => ({ type: "Post", id: post._id })), { type: "Post", id: "LIST" }]
                    : [{ type: "Post", id: "LIST" }],

            // @ts-ignore
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(addAllPost(data));
                } catch (err) {
                    console.log(err)

                }
            },
        }),
        followUser: builder.mutation({
            query: (id) => ({
                url: `user/follow/${id}`,
                method: 'PUT',
            }),
            //@ts-ignore
            invalidatesTags(result, error, arg, meta) {
                return [{ type: "User", id: arg.id }];
            },

        }),
        searchuser: builder.query({
            query: (search) => ({
                url: `user/search/${search}`,
                method: "GET",
            }),

        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `update`,
                method: 'PUT',
                body: data,
            }),

            //@ts-ignore
            invalidatesTags: ["Me"],

        }),

        // post routes
        addPost: builder.mutation({
            query: (data) => ({
                url: 'post',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Post"],
            // @ts-ignore
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(addSinglePost(data));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `post/${id}`,
                method: `DELETE`,
            }),
            //@ts-ignore
            async onQueryStarted(arg, api) {
                try {
                    await api.queryFulfilled;
                    api.dispatch(deletePost());

                } catch (err) {
                    console.log(err);
                }

            }

        }),
        likePost: builder.mutation({
            query: (id) => ({
                url: `post/like/${id}`,
                method: "PUT",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
        }),

        singlePost: builder.query({
            query: (id) => ({
                url: `post/${id}`,
                method: "GET",
            }),
            // @ts-ignore
            providesTags: (result, error, { id }) => [{ type: "Post", id }],

        }),
        repost: builder.mutation({
            query: (id) => ({
                url: `repost/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["User"],
        }),
        // comment route
        AddComment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `comment/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        deleteComment: builder.mutation({
            query: ({ postId, id }) => ({
                url: `comment/${postId}/${id}`,

                method: "DELETE",
            }),
            // @ts-ignore
            invalidatesTags: (result, err, { postId }) => {
                return [{ type: "Post", id: postId }];
            },
        }),

    }),

})
export const { useAllPostQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useRepostMutation,
    useSinglePostQuery,
    useLikePostMutation,
    useDeletePostMutation,
    useAddPostMutation,
    useUpdateProfileMutation,
    useFollowUserMutation,
    useLogoutMutation,
    useSigninMutation,
    useLoginMutation,
    useMyProfileQuery } = serviceApi;
export default serviceApi;