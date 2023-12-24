import React, { useEffect, useRef, useState } from 'react'

import { Document, Page } from 'react-pdf';
import { service } from '../../appwrite/bookKeepServices'
import style from "./PDFviewer.module.css"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

function PDFviewer({fileId,pageNo,setPageNo,sidebarExpanded}) {
  const [numPages, setNumPages] = useState();
  const [pdfURL,setPdfUrl]=useState(null)
  const [currentPage,setCurrentPage]=useState(1)
  const [scale,setScale]=useState(1)

  const onDocumentLoadSuccess=({ numPages })=>{
    const doc=document.querySelector(`.${style.pdfViewer}`)
    doc.addEventListener("wheel",(e)=>{
      if(e.ctrlKey){
        e.preventDefault()
        // console.log("user is zooming")
      }else{
        // console.log("user is scrolling")
      }
    },{passive:false})
    setNumPages(numPages);
  }
  const getUrl=async (fileId)=>{
    const pdf=service.getPDFview(fileId)
    setPdfUrl(pdf.href)
  }
  const pageScroll=(number)=>{
    const page=document.querySelector(`#page${number}`)
    const container=document.querySelector(`.${style.pdfViewer}`)
    if(page && container){
      container.scrollTo(0,page.offsetTop-8)
      console.log(number)
    }
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
              if(scale<2){
                setScale(prev=>prev+0.1)
              }
            }}
          >
            <FaPlus/>
          </button>
        </div>
        <div>
          <input 
            type="text" 
            value={currentPage}
            onChange={(e)=>setCurrentPage(e.currentTarget.value)}

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

              // const container=e.currentTarget
              // const scrollPosition = container.scrollTop;
              // const totalHeight = container.scrollHeight - container.clientHeight;
              // const currPage =Math.floor( ((scrollPosition / totalHeight) * 100) +1)
              // if(currPage!=currentPage){
              //   setCurrentPage(currPage)
              // }
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
                        <Page pageNumber={pageNumber} 
                        key={pageNumber} 
                        renderAnnotationLayer={false} 
                        renderTextLayer={false}
                        scale={scale}
                        />            
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





// import React, { useState } from 'react'
// import { Document, Page } from 'react-pdf';
// import { service } from '../../appwrite/bookKeepServices';
// const PDFviewer = ({ fileId}) => {
//   const [numPages, setNumPages] = useState();
//   const [pdfUrl,setPdfUrl]=useState(null)

//   const onDocumentLoadSuccess=({ numPages })=>{
//     setNumPages(numPages);
//   }
//   const getUrl=async (fileId)=>{
//     const pdf=await service.getPDFview(fileId)
//     setPdfUrl(pdf.href)
// }
//   useState(()=>{
//     console.log(fileId)
//     if(fileId!=null){
//         getPDF()
//     }
//   },[fileId])

//   return (
//     <div className='editorSubContainer'>
//     <div className='editor'>
//         {
//             pdfURL 

//             &&

//             <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
//             {
//             Array.apply(null, Array(numPages)).map((x,i)=> i+1).map((pageNumber)=>{
//                 return (
//                 <Page pageNumber={pageNumber} key={pageNumber} renderAnnotationLayer={false} renderTextLayer={false} />            
//                 )
//             })
//             }
//             </Document>

//         }
//     </div>
//   </div>
//   )
// }
// export default PDFviewer