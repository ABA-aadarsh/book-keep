import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Bottombar from '../../components/Bottombar/Bottombar'
import style from "./ReadBook.module.css"
import PDFviewer from '../../components/PDFviewer/PDFviewer'
import RightSidebar from './RightSidebar/RightSidebar'
import { service } from '../../appwrite/bookKeepServices'
import { useParams } from 'react-router-dom'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarningSharp } from "react-icons/io5";
import { authService } from '../../appwrite/auth'
import { toast } from 'react-toastify'

function ReadBook() {
    const {id}=useParams()
    const [bookData,setBookData]=useState(null)
    const [userAddedData,setUserAddedData]=useState(null)
    const [isChanged,setIsChanged]=useState(false)
    const [updationLoading,setUpdationLoading]=useState(false)
    
    const saveChanges=async ()=>{
      setUpdationLoading(true)
      const res= await service.updateBook(
        {
          ...bookData,
          id:id,
          added:userAddedData
        }
      )
      if(res){
        toast.success("File Saved SuccessFully")
        setIsChanged(false)
      }
      else{
        toast.error("File Saving Failed")
      }
      setUpdationLoading(false)
    }

    const getBookData=async (id)=>{
        const res=await service.getBook(id)
        if(res){
          setBookData(res)
          setUserAddedData(res?.added?JSON.parse(res.added):null)
        }
    }

    useEffect(()=>{
        getBookData(id)
    },[])

  return (
    <div className={style.page}>
        <Navbar/>
        <div className={style.container}>
          <div className={style.topPanel}>
            <ul style={{display:"flex",gap:"20px",listStyle:"none"}}>
              <li>Overview</li>
              <li>Settings</li>
            </ul>
            {
              updationLoading==false ?
              <div className={style.saveActionContainer}>
                <div className={style.saveInfo}>
                  {
                    isChanged==false ?
                    (
                      <>
                        <FaCheckCircle/>
                        <span>Uptodate</span>
                      </>
                    )
                    :
                    (
                      <>
                        <IoWarningSharp/>
                        <span>Unsaved</span>
                      </>
                    )
                  }
                </div>
                <button
                  style={
                    {
                      visibility:isChanged?"visible":"hidden"
                    }
                  }
                  onClick={saveChanges}
                >
                  <span>Save</span>
                  <FaCloudUploadAlt/>
                </button>
              </div>
              :
              <span>Loading ...</span>
            }
          </div>
          <div className={style.main}>
            <PDFviewer
              fileId={bookData?.fileId}
            />
            <RightSidebar
              data={userAddedData}
              setData={setUserAddedData}
              updateChangeStatus={setIsChanged}
            />
          </div>
        </div>
        <Bottombar/>
      </div>
  )
}

export default ReadBook