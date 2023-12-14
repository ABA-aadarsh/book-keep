import React from 'react'
import style from "./Bottombar.module.css"

function Bottombar({booksToRead,booksCompleted}) {
  return (
    <div
    className={style.container}
    >
      <div>
        <span>Books to Read:</span>
        <span>{booksToRead}</span>
      </div>

      <div>
        <span>Books Completed</span>
        <span>{booksCompleted}</span>
      </div>
    </div>
  )
}

export default Bottombar