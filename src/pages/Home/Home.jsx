import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

import style from "./Home.module.css"
import Bottombar from '../../components/Bottombar/Bottombar'
import BookListContainer from '../../components/BookList/BookListContainer'
import { service } from '../../appwrite/bookKeepServices'
import { useSelector } from 'react-redux'

function Home() {
  const [list,setList]=useState([])
  const {userID}=useSelector(state=>state.auth)
  const [categoriesList,setCategoriesList]=useState([])
  const getBookList=async()=>{
    // console.log(userID)
    const res= await service.listBooks(userID)
    setList([...res.documents])
    // console.log(res.documents)
    categoriesList.splice(0,categoriesList.length)
    res.documents.forEach(doc=>{
      const i=categoriesList.findIndex(i=>i.categoryName==doc.category)
      if(i==-1){
        categoriesList.push(
          {
            categoryName:doc.category==""?"Uncategorised":doc.category,
            books:[
              {
                name:doc.name,
                id:doc.$id
              }
            ]
          }
        )
      }else{
        categoriesList[i].books.push({
          name: doc.name,
          id: doc.$id
        })
      }
    })
    setCategoriesList([...categoriesList])
  }
  // const categoriesList=[
  //   {
  //     categoryName:"Programming",
  //     books:[
  //       {
  //         name:"DSA",
  //         id:"1243423"
  //       }
  //     ]
  //   },
  //   {
  //     categoryName:"Cooking",
  //     books:[
  //       {
  //         name:"Cooking 101",
  //         id:"2345"
  //       }
  //     ]
  //   }
  // ]

  useEffect(()=>{
      getBookList()
  },[])
  return (
    <>
      <div className={style.homePage}>
        <Navbar/>
        <div className={style.main}>
          <Sidebar
            categoriesList={categoriesList}
          />
          <div className={style.homeMainContainer}>
            <BookListContainer
              list={list}
            />
            <Bottombar
              booksToRead={list?.length || 0}
              booksCompleted={0}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home