import React from 'react'
import { useState } from 'react'
import style from "./Login.module.css"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { authService } from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { loginUserStore } from '../../store/AuthSlice'

function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)
  return (
    <div className={style.container}>
        <form className={style.centerContainer}
            onSubmit={async (e)=>{
                e.preventDefault()
                if(email!="" && password!=""){
                    setLoading(true)
                    const res=await authService.login({email,password})
                    console.log(res.userId)
                    if(res!=null){
                        const {name}=await authService.getCurrentUser()
                        dispatch(loginUserStore({userID:res.userId,userData:{name:name}}))
                        navigate("/")
                    }else{
                        toast.error("Login Failed")
                    }
                    setLoading(false)
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
                {
                    !loading?
                    <>Login</>:
                    <>
                        <div className={style.ldsRing}
                        ><div></div><div></div><div></div><div></div></div>
                    </>
                }

            </button>

            <span
                className={style.signupMessage}
            >Don't have an account ?  
                <Link to={"/signup"}
                    className={style.signupLink}
                >
                Create Account
                </Link>
            </span>
        </form>
    </div>
  )
}

export default Login