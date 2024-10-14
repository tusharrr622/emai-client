import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmailBody } from "../Api-routes/get-EmailBody";

const initialState = {
    bodyLoading: false,
    bodyLoadingError: "",
    emailBody: "",
    initial: "",
    subject: "",
    date: ""
}

export const fetchEmailBody = createAsyncThunk(
    "emaiBody/fetchEmailBody",
    async (id) => {
        let data = await getEmailBody(id);
        return data;
    }
);

const emailBodyDataSlice = createSlice({
    name: "emailBody",
    initialState,
    reducers: {
        setEmailDetails: (state, action) => {
            state.initial = action.payload.initial;
            state.subject = action.payload.subject;
            state.date = action.payload.date;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmailBody.pending, (state) => {
            state.bodyLoading = true;
            state.bodyLoadingError = false;
        });

        builder.addCase(fetchEmailBody.fulfilled, (state, action) => {
            state.bodyLoading = false;
            state.bodyLoadingError = false;
            state.emailBody = action.payload ?? "";
        })

        builder.addCase(fetchEmailBody.rejected, (state) => {
            state.bodyLoading = false;
            state.bodyLoadingError = true;
            state.emailBody = "";
            state.initial = "";
            state.subject = "";
            state.date = "";
            console.log("Error encountered while retrieving the email body");
        })
    }
});

export const { setEmailDetails } = emailBodyDataSlice.actions;
export default emailBodyDataSlice.reducer;