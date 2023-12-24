import React from 'react'
import { useState } from 'react'
import style from "./Signup.module.css"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../appwrite/auth'
import { loginUserStore } from '../../store/AuthSlice'
import { useDispatch } from 'react-redux'

function Signup() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(true)
  return (
    <div className={style.container}>
        <form className={style.centerContainer}
            onSubmit={async(e)=>{
                e.preventDefault()
                if(email!="" && password!="" && username!=""){
                    setLoading(true)
                    const res=await authService.createAccount({
                        email: email,
                        password: password,
                        name: username
                    })
                    if(res!=null && res.$id){
                        const {name}=await authService.getCurrentUser()
                        dispatch(loginUserStore({userID:res.$id,userData:{name:name}}))
                        navigate("/")
                    }
                    setLoading(false)
                }else{
                    toast.error("Invalid Email, Password or Username")
                }
            }}
        >

            <h1
                className={style.title}
            >
                Create Account
            </h1>

            <div className={style.inputContainer}>
                <span>Username</span>
                <input type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className={style.input}
                />
            </div>

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
                className={style.signupBtn}
                type='submit'
            >
                {
                    !loading?
                    <>Sign up</>:
                    <>
                        <div className={style.ldsRing}
                        ><div></div><div></div><div></div><div></div></div>
                    </>
                }
            </button>

            <span
                className={style.loginMessage}
            >Already have an account ? 
                <Link
                    to={"/login"}
                    className={style.loginLink}
                >
                    Login
                </Link>
            </span>
        </form>
    </div>
  )
}

export default Signup