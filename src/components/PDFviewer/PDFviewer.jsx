import React, { useEffect, useRef, useState } from 'react'

import { Document, Page } from 'react-pdf';
import { service } from '../../appwrite/bookKeepServices'
import style from "./PDFviewer.module.css"
import { pdfjs } from 'react-pdf';
import { envConf } from '../../envConf/envConf';
import { authService } from '../../appwrite/auth';

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PDFviewer({fileId,pageNo,setPageNo}) {
//     const [pdfUrl,setPdfUrl]=useState(null)
//     const pdfViewRef=useRef(null)
//     const getUrl=async (fileId)=>{
//         const pdf=await service.getPDFview(fileId)
//         setPdfUrl(pdf.href)
//     }
//     useEffect(()=>{
//         if(fileId!=null){
//             getUrl(fileId)
//         }
//     },[fileId])
//     useEffect(()=>{
        
//     },[setPageNo,pageNo])
//   return (
//     <div className={style.pdfViewerContainer}>
//         {
//             pdfUrl &&
//             <iframe src={pdfUrl+`#page=${pageNo}`}
//                 className={style.pdfViewer}
//                 ref={pdfViewRef}
//                 onScroll={()=>{console.log("Scrolled")}}
//             ></iframe>
//         }
//     </div>
//   )


  const [numPages, setNumPages] = useState();
  const [pdfURL,setPdfUrl]=useState(null)
  const ref=useRef(null)

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
  useEffect(()=>{
    // console.log(fileId)
    if(fileId!=undefined || fileId!=null){
        getUrl(fileId)
    }
  },[fileId])

  return (
    <div className={style.pdfViewerContainer}>
        {
            pdfURL 

            &&

            <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}
            className={style.pdfViewer}
            >
                {
                Array.apply(null, Array(numPages)).map((x,i)=> i+1).map((pageNumber)=>{
                    return (
                      <div
                      key={pageNumber}
                      className={style.page}
                      >
                        <Page pageNumber={pageNumber} key={pageNumber} renderAnnotationLayer={false} renderTextLayer={false}
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