import React from 'react'
import style from "./BookListItem.module.css"

function BookListItem({data}) {
    const {image,bookName,completionStatus,authorName}=data
  return (
    <div className={style.container}>
        {/* on click it should route to another page and allow to read or handle something with it */}
        <div className={style.imageContainer}>
            <img src={image} alt="" 
                className={style.image}
            />
            {/* i want to make a good 3d type book with the image in the cover,
                if the user does not set the image then maybe some default look will be good
                TODO
            */}
        </div>

        <div className={style.infoContainer}>
            <div className={style.bookInfo}>
                <h3>{bookName}</h3>
                <p>{authorName}</p>
                {/* todo
                    some other info like genre, labels(category it belongs in the user library)
                    or some other things like if there is any notes on it maybe or maybe not
                */}
            </div>
            <div className={style.bookStatus}>
                {
                    completionStatus
                }
                {/* completion bar */}
            </div>
        </div>
    </div>
  )
}

export default BookListItem