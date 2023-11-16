import React, {useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

import style from "./Home.module.css"
import Bottombar from '../../components/Bottombar/Bottombar'
import BookListContainer from '../../components/BookList/BookListContainer'

function Home() {
  const [list,setList]=useState(
    [
      {
        id:1,
        bookName:"Book 1",
        authorName:"Name 1",
        completionStatus:0,
        path:`/book1`
      }
    ]
  )
  return (
    <>
      <div className={style.homePage}>
        <Navbar/>
        <div className={style.main}>
          <Sidebar/>
          <BookListContainer
            list={list}
          />
        </div>
        <Bottombar/>
      </div>
    </>
  )
}

export default Home