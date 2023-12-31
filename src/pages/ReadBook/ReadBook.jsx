import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import style from "./ReadBook.module.css"
import { service } from '../../appwrite/bookKeepServices'
import { useParams } from 'react-router-dom'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarningSharp } from "react-icons/io5";
import { toast } from 'react-toastify'
import Overview from './Overview/Overview'
import SettingSection from './SettingSection/SettingSection'
import { IoBook } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
function ReadBook() {
    const {id}=useParams()
    const [bookData,setBookData]=useState(null)
    const [userAddedData,setUserAddedData]=useState(null)
    const [isChanged,setIsChanged]=useState(false)
    const [updationLoading,setUpdationLoading]=useState(false)
    const [activeTab,setActiveTab]=useState("Overview")
    const [pageNo,setPageNo]=useState(0)
    const [trackPage,setTrackPage]=useState(null)
    
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
          console.log(res)
          setBookData(res)
        }
    }

    useEffect(()=>{
        getBookData(id)
    },[])

    useEffect(()=>{
      if(bookData!=null){
        setUserAddedData(bookData?.added?JSON.parse(bookData.added):null)
      }
    },[bookData])

  return (
    <div className={style.page}>
        <Navbar/>
        <div className={style.container}>
          <div className={style.topPanel}>
            <ul
              className={style.tabsContainer}
            >
              <li
                className={style.tab}
                onClick={()=>activeTab!="Overview" && setActiveTab("Overview")}
                style={{background: activeTab=="Overview"?"#eceff434":"transparent"}}
              >
                <IoBook/>
                <span>Overview</span>
              </li>
              <li
                className={style.tab}
                onClick={()=>activeTab!="Settings" && setActiveTab("Settings")}
                style={{background: activeTab=="Settings"?"#eceff434":"transparent"}}
              >
                <IoSettingsSharp/>
                <span>Settings</span>
              </li>
            </ul>
            <div
              className={style.trackPageContainer}
            >
              <span>Mark Progress</span>
              <span
                className={style.trackPage}
              >{trackPage?.currentPage || 1}</span>
              <button
                className={style.updateCompletionStatusBtn}
                onClick={async ()=>{
                  if(isChanged==true){
                    confirm("Please save notes first.")
                    return
                  }
                  setUpdationLoading(true)
                  const res=await service.updateBook(
                    {
                      id: id,
                      ...bookData,
                      added: userAddedData,
                      completionStatus:trackPage ? JSON.stringify(trackPage) : "not Started"
                    }
                  )
                  if(res){
                    setUpdationLoading(false)
                    // setBookData(prev=>{return {...prev,
                      
                    // completionStatus: JSON.stringify(trackPage)}})
                  }
                }}
              >
                <GiCheckMark/>
              </button>
            </div>
            <div
              className={style.saveActionContainer}
            >
              {
              updationLoading==false ?
                <>
                  <div className={style.saveInfo}>
                    {
                      isChanged==false ?
                      (
                        <>
                          <FaCheckCircle
                            style={{color:"#1DE9B6"}}
                          />
                          <span
                            style={{color:"#1DE9B6"}}
                          >Uptodate</span>
                        </>
                      )
                      :
                      (
                        <>
                          <IoWarningSharp
                            style={{color:"#FFA000"}}
                          />
                          <span
                            style={{color:"#FFA000"}}
                          >Unsaved</span>
                        </>
                      )
                    }
                  </div>
                  <button
                    className={style.saveChangesBtn}
                    style={
                      {
                        visibility:isChanged?"visible":"hidden"
                      }
                    }
                    onClick={saveChanges}
                  >
                    <FaCloudUploadAlt/>
                    <span
                      className={style.btnText}
                    >Save</span>
                  </button>
                </>
              :
              <>
              <div className={style.ldsRing}
              ><div></div><div></div><div></div><div></div></div>
              </>
            }
            </div>
          </div>

          {/* settings or overview */}
          <Overview
            bookData={bookData}
            setIsChanged={setIsChanged}
            setUserAddedData={setUserAddedData}
            userAddedData={userAddedData}
            styling={
              {
                display :activeTab=="Overview"?"flex":"none"
              }
            }
            pageNo={pageNo}
            setPageNo={setPageNo}
            setTrackPage={setTrackPage}
          />
          {
            bookData &&
            <SettingSection
              bookData={bookData}
              setBookData={setBookData}
              styling={
                {
                  display :activeTab=="Settings"?"block":"none"
                }
              }
            />
          }
        </div>
      </div>
  )
}

export default ReadBook