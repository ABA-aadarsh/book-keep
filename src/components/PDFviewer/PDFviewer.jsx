import React, { useEffect, useRef, useState } from 'react'
import { service } from '../../appwrite/bookKeepServices'
import style from "./PDFviewer.module.css"

function PDFviewer({fileId,pageNo,setPageNo}) {
    const [pdfUrl,setPdfUrl]=useState(null)
    const pdfViewRef=useRef(null)
    const getUrl=async (fileId)=>{
        const pdf=await service.getPDFview(fileId)
        setPdfUrl(pdf.href)
    }
    useEffect(()=>{
        if(fileId!=null){
            getUrl(fileId)
        }
    },[fileId])
    useEffect(()=>{
        
    },[setPageNo,pageNo])
  return (
    <div className={style.pdfViewerContainer}>
        {
            pdfUrl &&
            <iframe src={pdfUrl+`#page=${pageNo}`}
                className={style.pdfViewer}
                ref={pdfViewRef}
                onScroll={()=>{console.log("Scrolled")}}
            ></iframe>
        }
    </div>
  )
}

export default PDFviewer



