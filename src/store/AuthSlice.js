import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userLoggedIn:false,
    userID:null,
    userData:null
}

const AuthSlice=createSlice(
    {
        name:"auth",
        initialState:initialState,
        reducers:{
            loginUserStore:(state,action)=>{
                state.userLoggedIn=true
                state.userID=action.payload.userID
                state.userData=action.payload.userData
            },
            logoutUserStore:(state)=>{
                state.userLoggedIn=false
                state.userID=null
                state.userData=null
            }
        }
    }
)


export const {loginUserStore,logoutUserStore}=AuthSlice.actions

export const authReducer=AuthSlice.reducer