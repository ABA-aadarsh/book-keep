import React from 'react'
import style from "./BookListItem.module.css"
import bookIcon from "/book-icon.png"
import { useNavigate } from 'react-router-dom'

function BookListItem({data}) {
    const navigate=useNavigate()
    const {$id,fileId,name,completionStatus,author}=data
    const getImagePreview=(fileId)=>{
        return ""
    }
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
                <p>{author}</p>
                {/* todo
                    some other info like genre, labels(category it belongs in the user library)
                    or some other things like if there is any notes on it maybe or maybe not
                */}
            </div>
            {/* <div className={style.bookStatus}>
                {
                    completionStatus
                }
            </div> */}
        </div>
    </div>
  )
}

export default BookListItem