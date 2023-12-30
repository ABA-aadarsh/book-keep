import React, { useEffect } from 'react'
import style from "./BookListItem.module.css"
import bookIcon from "/book-icon.png"
import { useNavigate } from 'react-router-dom'

function BookListItem({data}) {
    const navigate=useNavigate()
    const {$id,fileId,name,completionStatus,author}=data
    const getImagePreview=(fileId)=>{
        return ""
    }
    useEffect(()=>{
        console.log(completionStatus)
    },[])
  return (
    <div className={style.container}
        onClick={()=>{navigate(`/book/${$id}`)}}
    >
        {/* on click it should route to another page and allow to read or handle something with it */}
        <div className={style.imageContainer}>
            <img src={bookIcon} alt="" 
                className={style.image}
            />
        </div>

        <div className={style.infoContainer}>
            <div className={style.bookInfo}>
                <h3>{name}</h3>
                <p>{author!=""?author:"-----"}</p>
            </div>
            <div className={style.bookStatus}>
                {
                    completionStatus!="not Started"
                    ?
                    <>
                    
                    <div
                        className={style.progressBar}
                    >
                        <div
                            className={style.completed}
                            style={
                                {
                                    width: JSON.parse(completionStatus).currentPage/JSON.parse(completionStatus).totalPage*100+"%"
                                }
                            }
                        ></div>
                    </div>
                    <span>
                        {
                            JSON.parse(completionStatus).currentPage==JSON.parse(completionStatus).totalPage ?
                            <>Completed</>
                            :
                            <>{Math.floor(JSON.parse(completionStatus).currentPage/JSON.parse(completionStatus).totalPage*100)} %</>
                        }
                    </span>
                    </>
                    :
                    <>Status: Not Started</>
                }
            </div>
        </div>
    </div>
  )
}

export default BookListItem