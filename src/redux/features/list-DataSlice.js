import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmailList } from "../Api-routes/get-EmailList";

const initialState = {
    listLoading: false,
    listLoadingError: false,
    emailList: [],
    favorites: [],
    read: []
}

export const fetchEmailList = createAsyncThunk(
    "emailList/fetchEmailList",
    async (pageNumber) => {
        let data = await getEmailList(pageNumber);
        return data;
    }
);

const emailListDataSlice = createSlice({
    name: 'emailList',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites = [...state.favorites, action.payload];
        },

        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter((item) => item !== action.payload);
        },

        addToRead: (state, action) => {
            state.read = [...state.read, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmailList.pending, (state) => {
            state.listLoading = true;
            state.listLoadingError = false
        });

        builder.addCase(fetchEmailList.fulfilled, (state, action) => {
            state.listLoading = false;
            state.listLoadingError = false;
            state.emailList = action.payload ?? [];
        });

        builder.addCase(fetchEmailList.rejected, (state) => {
            state.listLoading = false;
            state.listLoadingError = true;
            state.emailList = [];
            console.log("Error encountered while retrieving the email list");
        });
    }
});

export const { addToFavorites, removeFromFavorites, addToRead } = emailListDataSlice.actions;
export default emailListDataSlice.reducer;