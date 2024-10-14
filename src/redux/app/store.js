import { configureStore } from "@reduxjs/toolkit";
import emailListDataSlice from "../features/list-DataSlice";
import emailBodyDataSlice from "../features/body-DataSlice";

export const store = configureStore({
    reducer: {
        emailList: emailListDataSlice,
        emailBody: emailBodyDataSlice
    },
});