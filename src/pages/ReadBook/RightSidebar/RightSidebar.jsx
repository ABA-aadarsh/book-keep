import React, { useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable';
import style from "./RightSidebar.module.css"
import { FaRegNoteSticky } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineNoteAdd } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

function RightSidebar({data,setData,updateChangeStatus}) {
  const [sidebarExpanded,setSidebarExpanded]=useState(false)
  const [sidebarContent,setSidebarContent]=useState("")
  const [sidebarContentTitle,setSidebarContentTitle]=useState(null)
  return (
    <div
      className={style.container}
    >
      <div className={style.expandedSidebar}
        style={{
          display:sidebarExpanded?"flex":"none"
        }}
      >
        <div>
          <h3
            className={style.sidebarContentTitle}
          >{sidebarContentTitle}</h3>
          {/* <div>
            <button className={style.btn}>
              <BiEditAlt/>
            </button>
            <button className={style.btn}>
              <MdDelete/>
            </button>
          </div> */}
        </div>
        <div
          className={style.sidebarContentContainer}
        >
          {/* <p
            className={style.sidebarContent}
            placeholder='Type here. '
            value={sidebarContent}
            onChange={(e)=>{
              e.currentTarget.style.height="auto"
              e.currentTarget.style.height=e.currentTarget.scrollHeight+10+"px"
              setSidebarContent(e.target.value)
              setData(prev=>{
                prev[sidebarContentTitle.toLowerCase()]=e.target.value
                return prev
              })
            }}
          >
          {
            sidebarContent && sidebarContent
          }
          </p> */}
          {(sidebarContent=='' || sidebarContent=="<br>") && <div className={style.placeholder}>Type something here...</div>}
          <ContentEditable
            html={sidebarContent}
            onChange={(e)=>{
              updateChangeStatus(true)
              e.currentTarget.style.height="auto"
              e.currentTarget.style.height=e.currentTarget.scrollHeight+10+"px"
              // const data=e.target.value
              // console.log(data.match(/#(\d+)/g))
              setSidebarContent(e.target.value)
              setData(prev=>{
                prev[sidebarContentTitle.toLowerCase()]=e.target.value
                return prev
              })
            }}
            className={style.sidebarContent}
          />
        </div>
      </div>
      <div className={style.iconsContainer}>
        <button
          className={style.btn}
          onClick={()=>{
            if(sidebarContentTitle!="Notes"){
              setSidebarContentTitle("Notes")
              console.log(data)
              setSidebarContent(data.notes)
              setSidebarExpanded(true)
              return
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
              setSidebarExpanded(true)
              return
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
              setSidebarExpanded(true)
              return
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

      </div>
    </div>
  )
}

export default RightSidebar