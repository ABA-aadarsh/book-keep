import React, { useEffect, useState } from 'react'
import style from "./RightSidebar.module.css"
import { FaRegNoteSticky } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineNoteAdd } from "react-icons/md";

function RightSidebar({data}) {
  const [sidebarExpanded,setSidebarExpanded]=useState(false)
  const [sidebarContent,setSidebarContent]=useState(null)
  const [sidebarContentTitle,setSidebarContentTitle]=useState(null)
  return (
    <div
      className={style.container}
    >
      <div className={style.expandedSidebar}
        style={{
          display:sidebarExpanded?"unset":"none"
        }}
      >
        <h3>{sidebarContentTitle}</h3>
        <p>
          {
            sidebarContent && sidebarContent
          } 
        </p> 
      </div>
      <div className={style.iconsContainer}>
        <button
          className={style.btn}
          onClick={()=>{
            if(sidebarContentTitle!="Notes"){
              setSidebarContentTitle("Notes")
              setSidebarContent(data.notes)
            }
            if(sidebarExpanded==false){
              setSidebarExpanded(true)
            }else{
              setSidebarExpanded(false)
            }
          }}
        >
          {/* Notes */}
          <FaRegNoteSticky/>
        </button>
        <button
          className={style.btn}
          onClick={()=>{
            if(sidebarContentTitle!="Summary"){
              setSidebarContentTitle("Summary")
              setSidebarContent(data.summary)
            }

            if(sidebarExpanded==false){
              setSidebarExpanded(true)
            }else{
              setSidebarExpanded(false)
            }
          }}
        >
          {/* summary */}
          <CgNotes/>
        </button>
        <button
          className={style.btn}
          onClick={()=>{
            if(sidebarContentTitle!="Review"){
              setSidebarContentTitle("Review")
              setSidebarContent(data.review)
            }

            if(sidebarExpanded==false){
              setSidebarExpanded(true)
            }else{
              setSidebarExpanded(false)
            }
          }}
        >
          {/* review */}
          <MdOutlineRateReview/>
        </button>
        <button
          className={style.btn}
        >
          <MdOutlineNoteAdd/>
        </button>
      </div>
    </div>
  )
}

export default RightSidebar