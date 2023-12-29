import React, { useEffect, useRef, useState } from 'react'

import { Document, Page } from 'react-pdf';
import { service } from '../../appwrite/bookKeepServices'
import style from "./PDFviewer.module.css"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

function PDFviewer({fileId,pageNo,setPageNo,sidebarExpanded,setTrackPage=()=>{},defaultPage}) {
  const [numPages, setNumPages] = useState();
  const [pdfURL,setPdfUrl]=useState(null)
  const [currentPage,setCurrentPage]=useState(1)
  const [scale,setScale]=useState(1) 
  const [pagesLoaded,setPagesLoaded]=useState(false)
  var debounce_timer;
  const onDocumentLoadSuccess=({ numPages })=>{
    const doc=document.querySelector(`.${style.pdfViewer}`)
    doc.addEventListener("wheel",(e)=>{
      if(e.ctrlKey){
        e.preventDefault()
      }
    },{passive:false})
    setNumPages(numPages);
    pageScroll(defaultPage)
  }
  const getUrl=async (fileId)=>{
    const pdf=service.getPDFview(fileId)
    setPdfUrl(pdf.href)
  }
  const pageScroll=(number)=>{
    console.log(number)
    const page=document.querySelector(`#page${number}`)
    const container=document.querySelector(`.${style.pdfViewer}`)
    if(page && container){
      container.scrollTo(0,page.offsetTop-8)
    }
  }
  const updateCurrentPage=(approxPercentage)=>{
    function isInViewport(element, container) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      let coverPercentage
      if(elementRect.top>=containerRect.top && elementRect.bottom<=containerRect.bottom){
        return true
      }
      else if(elementRect.top<containerRect.top && elementRect.bottom>containerRect.bottom){
        return true
      }
      else if(elementRect.top>containerRect.top && elementRect.top<containerRect.bottom){
        coverPercentage=Math.abs(containerRect.bottom-elementRect.top)/containerRect.height*100
        if(coverPercentage>=60) return true
      }else if(elementRect.top<containerRect.top && elementRect.bottom>containerRect.top){
        coverPercentage=Math.abs(containerRect.top-elementRect.bottom)/containerRect.height*100
        if(coverPercentage>=60) return true
      }
      return false
    }
    function implementUpdate(entries,container) {
      for(let i=0;i<[...entries].length;i++){
        const entry=entries[i]
        if (isInViewport(entry,container)) {
          const page=entry.id
          setCurrentPage(page.substr(4)*1)
          break
        }
      }
    }
    const container=document.querySelector(`.${style.pdfViewer}`)
    let pages=[...document.querySelectorAll(`.${style.page}`)]
    const min=(approxPercentage*pages.length/100)-5
    const max=(approxPercentage*pages.length/100)+5
    pages=pages.splice(min<0?0:min,max)
    implementUpdate(pages,container)
  }
  useEffect(()=>{
    if(pageNo!=0){
      const number=pageNo.split("#")[0]
      pageScroll(number)
    }
  },[pageNo,setPageNo])
  useEffect(()=>{
    if(fileId!=undefined || fileId!=null){
        getUrl(fileId)
    }
  },[fileId])
  useEffect(()=>{
    if(currentPage && numPages){
      setTrackPage({
        currentPage:currentPage,
        totalPage:numPages
      })
    }
  },[currentPage])

  return (
    <div className={style.pdfViewerContainer}
      style={{
        maxWidth: sidebarExpanded?`calc(100vw - 450px)`:"calc(100vw - 50px)"
      }}
    >
      <div
        className={style.topPanel}
      >
        <div
          className={style.zoomContainer}
        >
          <button
            className={style.zoomBtns}
            onClick={()=>{
              if(scale>0.20){
                setScale(prev=>prev-0.1)
              }
            }}
          >
            <FaMinus/>
          </button>
          <span
            className={style.zoomValue}
          >{Math.floor(scale*100)}%</span>
          <button
            className={style.zoomBtns}
            onClick={()=>{
              if(scale<1.9){
                setScale(prev=>prev+0.1)
              }
            }}
          >
            <FaPlus/>
          </button>
        </div>
        <div
          className={style.pageNumberContainer}
        >
          <input 
            type="number" 
            className={style.currentPageInput}
            value={currentPage}
            onChange={(e)=>setCurrentPage(e.currentTarget.value)}
            onKeyDown={(e)=>{
              if(e.key=="Enter"){
                if(!isNaN(currentPage)){
                  pageScroll(currentPage)
                }
              }
            }}
          />
          <span> of {numPages}</span>
        </div>
      </div>
        {
            pdfURL 

            &&

            <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}
            className={style.pdfViewer}
            onScroll={(e)=>{
              if(debounce_timer) {
                window.clearTimeout(debounce_timer);
              }
              const container=e.currentTarget
              const scrollPosition = container.scrollTop;
              const totalHeight = container.scrollHeight - container.clientHeight;
              const percentage =Math.floor( ((scrollPosition / totalHeight) * 100))
              debounce_timer = window.setTimeout(function() {
                updateCurrentPage(percentage)
              }, 10);
              // updateCurrentPage(percentage)
            }}
            >
              {
                Array.apply(null, Array(numPages)).map((x,i)=> i+1).map((pageNumber)=>{
                    return (
                      <div
                        key={pageNumber}
                        className={style.page}
                        id={`page${pageNumber}`}
                      >
                        {
                          defaultPage==pageNumber ? 
                          <Page pageNumber={pageNumber}
                          key={pageNumber} 
                          renderAnnotationLayer={false} 
                          renderTextLayer={false}
                          scale={scale}
                          onLoadSuccess={()=>pageScroll(pageNumber)}
                          />  
                          :
                          <Page pageNumber={pageNumber}
                          key={pageNumber} 
                          renderAnnotationLayer={false} 
                          renderTextLayer={false}
                          scale={scale}
                          />  
                        }
                                  
                      </div>
                    )
                })
              }
            </Document>

        }
  </div>
  )
}

export default PDFviewer