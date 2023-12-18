import React from 'react'
import style from "./Sidebar.module.css"
import { useNavigate } from 'react-router-dom'
import { BiCategory } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa6";
import { BsBookmarksFill } from "react-icons/bs";

function Sidebar({categoriesList=[]}) {
  const navigate=useNavigate()
  return (
    <div className={style.sidebar}>
      <div
        className={style.headTitle}
      >
        <h4
          className={style.headingTitle}
        >
          <BiCategory/>
          <span>
            Categories
          </span>
        </h4>
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
      <ul
        className={style.listOfCategory}
      >
        {
          categoriesList.map(category=>{
            return (
              <li
                key={category.categoryName}
                className={style.category}
              >
                <h5
                  className={style.categoryName}
                >{category.categoryName}</h5>
                <ul
                  className={style.listOfBooks}
                >
                  {
                    category.books.map(
                      book=>(
                        <li
                          key={book.id}
                          className={style.book}
                          onClick={()=>{
                            navigate(`/book/${book.id}`)
                          }}
                          style={{cursor:"pointer"}}
                        >
                          <FaBookOpen
                            className={style.bookIcon}
                          />
                          <span
                            className={style.bookName}
                          >
                          {book.name.length<50?book.name:book.name.substr(0,50)+"..."}
                          </span>
                        </li>
                      )
                    )
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar