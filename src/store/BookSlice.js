import { createSlice } from "@reduxjs/toolkit";

const initialState={
    books:[
        {
            id:"id",
            name:"book1",
            userId:"user",
            author:"author",
            added:{
                notes:"notes",
                summary:"summary",
                review:"review"
            },
            completionStatus:"not started",
            fileId:"fileid"
        }
    ]
}

const BookSlice=createSlice(
    {
        name:"bookData",
        initialState,
        reducers:{
            add:(state,action)=>{
                state.books.push(
                    action.payload.bookInfo
                )
            },
            remove:(state,action)=>{
                state.books=state.books.filter(i=>i.id!==action.payload.id)
            }
        }
    }
)

export const {add,remove}=BookSlice.actions

export const bookReducer=BookSlice.reducer