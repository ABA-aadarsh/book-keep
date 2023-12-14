import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Bottombar from '../../components/Bottombar/Bottombar'
import style from "./ReadBook.module.css"
import PDFviewer from '../../components/PDFviewer/PDFviewer'
import RightSidebar from './RightSidebar/RightSidebar'
import { service } from '../../appwrite/bookKeepServices'
import { useParams } from 'react-router-dom'

function ReadBook() {
    const {id}=useParams()
    const [bookData,setBookData]=useState(null)

    const getBookData=async (id)=>{
        const res=await service.getBook(id)
        if(res){
          setBookData(res)
        }
    }

    useEffect(()=>{
        getBookData(id)
    },[])

  return (
    <div className={style.page}>
        <Navbar/>
        <div className={style.main}>
          <PDFviewer
            fileId={bookData?.fileId}
          />
          <RightSidebar
            data={bookData?.added?JSON.parse(bookData.added):null}
          />
        </div>
        <Bottombar/>
      </div>
  )
}

export default ReadBook