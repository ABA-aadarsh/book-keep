import React from 'react'
import PDFviewer from '../../../components/PDFviewer/PDFviewer'
import RightSidebar from './RightSidebar/RightSidebar'
import style from "./Overview.module.css"

function Overview(
    {bookData,setIsChanged,userAddedData,setUserAddedData,styling={},pageNo,setPageNo=()=>{}}
) {
    return (
        <div className={style.container}
            style={styling}
        >
            <PDFviewer
                fileId={bookData?.fileId}
                pageNo={pageNo}
                setPageNo={setPageNo}
            />
            <RightSidebar
                data={userAddedData}
                setData={setUserAddedData}
                updateChangeStatus={setIsChanged}
                setPageNo={setPageNo}
            />
        </div>
    )
}

export default Overview