import React from 'react'
import style from "./AccountBtn.module.css"
import {MdAccountCircle} from "react-icons/md"
import { useDispatch } from 'react-redux'
import { logoutUserStore } from '../../../store/AuthSlice'
import { authService } from '../../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AccountBtn() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  return (
    <div>
        <button
          onClick={async ()=>{
            dispatch(logoutUserStore())
            toast.info("Logging Out")
            const res=await authService.logout()
            console.log(res)
            if(res){
              navigate("/login")
            }
          }}
        >
            <MdAccountCircle/>
        </button>
    </div>
  )
}

export default AccountBtn