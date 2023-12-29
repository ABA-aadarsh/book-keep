import React, { useEffect, useState } from 'react'
import PDFviewer from '../../../components/PDFviewer/PDFviewer'
import RightSidebar from './RightSidebar/RightSidebar'
import style from "./Overview.module.css"

function Overview(
    {bookData,setIsChanged,userAddedData,setUserAddedData,styling={},pageNo,setPageNo=()=>{},setTrackPage=()=>{}}
    
) {  
    const [sidebarExpanded,setSidebarExpanded]=useState(false)
    return (
        <div className={style.container}
            style={styling}
        >
            <PDFviewer
                fileId={bookData?.fileId}
                setPageNo={setPageNo}
                pageNo={pageNo}
                sidebarExpanded={sidebarExpanded}
                setTrackPage={setTrackPage}
                defaultPage={bookData?.completionStatus?JSON.parse(bookData?.completionStatus).currentPage:1}
            />
            <RightSidebar
                data={userAddedData}
                setData={setUserAddedData}
                updateChangeStatus={setIsChanged}
                setPageNo={setPageNo}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
            />
        </div>
    )
}

export default Overview