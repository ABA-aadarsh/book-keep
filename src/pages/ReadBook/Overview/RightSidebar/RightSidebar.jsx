import React, { useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable';
import style from "./RightSidebar.module.css"
import { FaRegNoteSticky } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { MdOutlineRateReview } from "react-icons/md";
// import { MdOutlineNoteAdd } from "react-icons/md";
// import { BiEditAlt } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";

function RightSidebar({data,setData,updateChangeStatus}) {
  const [sidebarExpanded,setSidebarExpanded]=useState(false)
  const [sidebarContent,setSidebarContent]=useState("")
  const [sidebarContentTitle,setSidebarContentTitle]=useState(null)
  const [mode,setMode]=useState("view")
  useEffect(()=>{
    document.querySelectorAll(`.${style.btn}`).forEach(i=>i.classList.remove(style.iconActive))
    if(sidebarExpanded){
      document.querySelector(`.${sidebarContentTitle.toLowerCase()}`).classList.add(style.iconActive)
    }
  },[sidebarExpanded,sidebarContentTitle])
  useEffect(()=>{
    if(data!=null && sidebarContentTitle!=null){
      setSidebarContent(data[sidebarContentTitle.toLowerCase()])
    }
  },[data])
  return (
    <div
      className={style.container}
    >
      <div className={style.expandedSidebar + " " + (sidebarExpanded && style.expanded)}
        // style={{
        //   width:sidebarExpanded?"400px":"0px"
        // }}
      >
        <div className={style.titleAndModes}>
          <h3
            className={style.sidebarContentTitle}
          >{sidebarContentTitle}
          </h3>
          <div
            className={style.modesContainer}
          >
            {/* modes */}
            <button
              title='View'
              className={style.modeBtn}
              style={{
                color:mode=="view"?"#ff922b":"rgba(216, 222, 233, 0.38)"
              }}
              onClick={()=>setMode("view")}
            >
              <FaRegEye/>
            </button>
            <button
              title='Write'
              className={style.modeBtn}
              style={{
                color:mode=="write"?"#ff922b":"rgba(216, 222, 233, 0.38)"
              }}
              onClick={()=>setMode("write")}
            >
              <FaPenNib/>
            </button>
          </div>
        </div>
        <div
          className={style.sidebarContentContainer}
        >
          {((sidebarContent=='' || sidebarContent=="<br>") && mode=="write") && <div className={style.placeholder}>Type something here...</div>}
          {/* <ContentEditable
            html={sidebarContent==""?"<br>":sidebarContent}
            onChange={(e)=>{
              updateChangeStatus(true)
              setSidebarContent(e.target.value)
              setData(prev=>{
                prev[sidebarContentTitle.toLowerCase()]=e.target.value
                return prev
              })
            }}
            className={style.sidebarContent}
          /> */}
          <div
            className={style.sidebarContentView}
            style={
              {
                display:mode=="view"?"block":"none"
              }
            }
          >
            <pre>
              {
                sidebarContent!="" ?
                sidebarContent.split("\n").map(i=>(
                  <p
                    key={Math.random()*10000}
                  >
                    {i}
                  </p>
                )):
                <div className={style.placeholderWrite}>Click on write mode and start writing...</div>
              }
            </pre>
          </div>
          <textarea
            value={sidebarContent}
            onChange={(e)=>{
              updateChangeStatus(true)
              setSidebarContent(e.target.value)
              setData(prev=>{
                prev[sidebarContentTitle.toLowerCase()]=e.target.value
                return prev
              })
            }}
            className={style.sidebarContentWrite}
            style={
              {
                display:mode=="write"?"block":"none"
              }
            }
          />
        </div>
      </div>
      <div className={style.iconsContainer}>
        <button
          className={style.btn+" notes"}
          onClick={(e)=>{
            if(sidebarContentTitle!="Notes"){
              setSidebarContentTitle("Notes")
              setSidebarContent(data.notes)
              setSidebarExpanded(true)
              setMode("view")
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
          className={style.btn+" summary"}
          onClick={()=>{
            if(sidebarContentTitle!="Summary"){
              setSidebarContentTitle("Summary")
              setSidebarContent(data.summary)
              setSidebarExpanded(true)
              setMode("view")
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
          className={style.btn+" review"}
          onClick={()=>{
            if(sidebarContentTitle!="Review"){
              setSidebarContentTitle("Review")
              setSidebarContent(data.review)
              setSidebarExpanded(true)
              setMode("view")
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