import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthSlice";
import { bookReducer } from "./BookSlice";

export const store=configureStore(
    {
        reducer:{
            auth: authReducer,
            bookData:bookReducer
        }
    }
)