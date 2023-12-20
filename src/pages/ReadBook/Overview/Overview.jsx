import React from 'react'
import PDFviewer from '../../../components/PDFviewer/PDFviewer'
import RightSidebar from './RightSidebar/RightSidebar'
import style from "./Overview.module.css"

function Overview(
    {bookData,setIsChanged,userAddedData,setUserAddedData,styling={}}
) {
    return (
        <div className={style.container}
            style={styling}
        >
            <PDFviewer
                fileId={bookData?.fileId}
            />
            <RightSidebar
                data={userAddedData}
                setData={setUserAddedData}
                updateChangeStatus={setIsChanged}
            />
        </div>
    )
}

export default Overview