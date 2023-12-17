import React, { useEffect, useState } from 'react'
import { service } from '../../appwrite/bookKeepServices'
import style from "./PDFviewer.module.css"

function PDFviewer({fileId}) {
    const [pdfUrl,setPdfUrl]=useState(null)
    const [pageNumber,setPageNumber]=useState(1)
    const getUrl=async (fileId)=>{
        // console.log(fileId)
        const pdf=await service.getPDFview(fileId)
        // console.log( pdf)
        setPdfUrl(pdf.href)
    }
    useEffect(()=>{
        if(fileId!=null){
            getUrl(fileId)
        }
    },[fileId])
  return (
    <div className={style.pdfViewerContainer}>
        {
            pdfUrl &&
            <iframe src={pdfUrl+`#page=${pageNumber}`}
                className={style.pdfViewer}
            ></iframe>
        }
    </div>
  )
}

export default PDFviewer



