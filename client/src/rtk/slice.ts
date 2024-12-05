
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface IinitialState {
    openAddPostModel: boolean;
    openEditProfileModel: boolean;
    openMainMenu: HTMLButtonElement | null;
    openMyMenu: HTMLButtonElement | null;
    darkMode: boolean;
    myProfile: any;
    allPost: any;
    userData: any;
    postId: any;
    searchUsers: any;

}

const initialState: IinitialState = {
    openAddPostModel: false,
    openEditProfileModel: false,
    openMainMenu: null,
    openMyMenu: null,
    darkMode: false,
    myProfile: null,
    allPost: [],
    userData: [],
    searchUsers: [],
    postId: "",

}

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        addPostModel: (state, action: PayloadAction<boolean>) => {
            state.openAddPostModel = action.payload
        },
        editProfileModel: (state, action: PayloadAction<boolean>) => {
            state.openEditProfileModel = action.payload
        },
        toggleMainMenu: (state, action: PayloadAction<HTMLButtonElement | null>) => {
            state.openMainMenu = action.payload as any;
        },
        toggleMyMenu: (state, action: PayloadAction<HTMLButtonElement | null>) => {

            state.openMyMenu = action.payload as any;
        },
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode
        },
        addMyProfile: (state, action: PayloadAction<any>) => {
            state.myProfile = action.payload;

        },
        addAllPost: (state, action: PayloadAction<Array<any>>) => {
            state.allPost = action.payload;

        },
        addSinglePost: (state, action: PayloadAction<any>) => {
            const updatedArr = [action.payload.newPost, ...state.allPost];
            const uniqueArr = new Set();
            const uniquePost = updatedArr.filter((e) => {
                if (!uniqueArr.has(e._id)) {
                    uniqueArr.add(e);
                    return true;
                }
                return false;
            });

            state.allPost = [...uniquePost];
        },

        searcUser(state, action: PayloadAction<Array<any>>) {
            state.userData = action.payload;
        },
        deletePost(state) {
            state.allPost = state.allPost.filter((post: any) => {
                return post.id != state.postId;
            });
        },
        addToSearchUser(state, action: PayloadAction<any>) {
            state.searchUsers = action.payload;

        },
        addPostId(state, action: PayloadAction<any>) {
            state.postId = action.payload;
        }

    },
});
export const { addToSearchUser, deletePost, addSinglePost, searcUser, addPostModel, editProfileModel, toggleMainMenu, toggleMyMenu, toggleTheme, addMyProfile, addAllPost } = serviceSlice.actions;
export default serviceSlice.reducer