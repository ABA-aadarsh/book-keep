import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authService } from '../appwrite/auth'
import { loginUserStore } from '../store/AuthSlice'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children}) {
    const userLoggedIn=useSelector(state=>state.auth.userLoggedIn)
    const [isAuthenticated,setIsAuthenticated]=useState(userLoggedIn)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const authenticateFunction=async ()=>{
        const res=await authService.getCurrentUser()
        if(res){
            dispatch(
                loginUserStore(
                    {
                        userID: res.$id
                    }
                )
            )
            setIsAuthenticated(true)
        }else{
            navigate("/login")
        }
    }
    useEffect(()=>{
        if(isAuthenticated==false){
            authenticateFunction()
        }
    },[])
  return isAuthenticated && (
      <>
        {
            children
        }
    </>
  )
}

export default AuthLayout