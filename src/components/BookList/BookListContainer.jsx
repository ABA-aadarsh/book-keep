import React, { useEffect, useState } from 'react'
import BookListItem from './BookListItem'
import style from "./BookListContainer.module.css"
import {BsPlus} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { BsBookmarksFill } from "react-icons/bs";

function BookListContainer({list}) {
    const navigate=useNavigate()
  return (
    <div className={style.container}>
        <div
         className={style.headingContainer}
        >
            <h2
                className={style.title}
            >Your books</h2>
            <button
            className={style.newBtn}
            onClick={()=>{
                navigate("/book/add")
            }}
            >
                <BsBookmarksFill
                fontSize={18}
                fontWeight={500}
                />
                <span
                    style={{paddingBottom:"2px"}}
                >New</span>
            </button>
        </div>
        <div>
            {
                list?.map((i,index)=>(
                    <BookListItem
                        key={index}
                        data={i}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default BookListContainer