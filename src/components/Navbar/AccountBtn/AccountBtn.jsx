import React, { useEffect, useState } from 'react'
import style from "./AccountBtn.module.css"
import {MdAccountCircle} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserStore } from '../../../store/AuthSlice'
import { authService } from '../../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoMdLogOut } from "react-icons/io";

function AccountBtn() {
  const dispatch=useDispatch()
  const {userData,userID}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  const [modalOpen,setModalOpen]=useState(false)
  return (
    <div
      className={style.container}
    >
      <button
        className={style.accountBtn}
        onClick={()=>setModalOpen(prev=>!prev)}
      >
          <MdAccountCircle/>
      </button>

      <div
        className={style.modalContainer}
        style={{
          display:modalOpen?"unset":"none"
        }}
      >
        <div
          className={style.userInfo}
        >
          {/* user info */}
          <MdAccountCircle
            className={style.icon}
          />
          
          <span
            className={style.name}
          >
            {
              userData?.name || "User"
            }
          </span>
          <span
            className={style.id}
          >
            {
              userID || "user id"
            }
          </span>
        </div>
        <div
          className={style.signoutBox}
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
          <span>Sign Out</span>
          <IoMdLogOut/>
        </div>
      </div>
    </div>
  )
}

export default AccountBtn