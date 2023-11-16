import React from 'react'
import BookListItem from './BookListItem'
import style from "./BookListContainer.module.css"
import {BsPlus} from "react-icons/bs"

function BookListContainer({list}) {
  return (
    <div className={style.container}>
        <h2>Your books</h2>
        <div>
            {
                list.map((i,index)=>(
                    <BookListItem 
                        key={index}
                        data={i}
                    />
                ))
            }
        </div>
        <div className={style.addBtnContainer}>
            <button>
                <BsPlus/>
                <span>
                    Add Book
                </span>
            </button>
        </div>
    </div>
  )
}

export default BookListContainer