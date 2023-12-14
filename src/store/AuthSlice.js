import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userLoggedIn:false,
    userID:null
}

const AuthSlice=createSlice(
    {
        name:"auth",
        initialState:initialState,
        reducers:{
            loginUserStore:(state,action)=>{
                state.userLoggedIn=true
                state.userID=action.payload.userID
            },
            logoutUserStore:(state)=>{
                state.userLoggedIn=false
                state.userID=null
            }
        }
    }
)


export const {loginUserStore,logoutUserStore}=AuthSlice.actions

export const authReducer=AuthSlice.reducer