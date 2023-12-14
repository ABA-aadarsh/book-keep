import React from 'react'
import { useState } from 'react'
import style from "./Login.module.css"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { authService } from '../../appwrite/auth'

function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
  return (
    <div className={style.container}>
        <form className={style.centerContainer}
            onSubmit={async (e)=>{
                e.preventDefault()
                if(email!="" && password!=""){
                    const res=await authService.login({email,password})
                    if(res!=null){
                        navigate("/")
                    }else{
                        toast.error("Login Failed")
                    }
                }else{
                    toast.error("Invalid Email and Password")
                }
            }}
        >

            <div className={style.inputContainer}>
                <span>Email</span>
                <input type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={style.input}
                />
            </div>
            <div className={style.inputContainer}>
                <span>Password</span>
                <input type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={style.input}
                />
            </div>


            <button
                className={style.loginBtn}
                type='submit'
            >
                Login
            </button>

            <span
                className={style.signupMessage}
            >Don't have an account ? 
                <Link to={"/signup"}>
                Create Account
                </Link>
            </span>
        </form>
    </div>
  )
}

export default Login