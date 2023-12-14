import React from 'react'
import style from "./Sidebar.module.css"
import { useNavigate } from 'react-router-dom'

function Sidebar({categoriesList=[]}) {
  const navigate=useNavigate()
  return (
    <div className={style.sidebar}>
      <h4>Categories</h4>
      <ul>
        {
          categoriesList.map(category=>{
            return (
              <li
                key={category.categoryName}
              >
                <h5>{category.categoryName}</h5>
                <ul>
                  {
                    category.books.map(
                      book=>(
                        <li
                          key={book.id}
                          onClick={()=>{
                            navigate(`/book/${book.id}`)
                          }}
                          style={{cursor:"pointer"}}
                        >
                          {book.name}
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