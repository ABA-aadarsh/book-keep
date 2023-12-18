import React, { useEffect, useRef, useState } from 'react'
import style from "./Searchbar.module.css"
import { IoIosSearch } from "react-icons/io";

function Searchbar() {
    const [searchValue,setSearchValue]=useState("")
    const containerRef=useRef(null)
  return (
    <div className={style.container}
    ref={containerRef}
    >
        <IoIosSearch/>
        <input type="text" 
          value={searchValue}
          className={style.input}
          onClick={()=>containerRef.current.classList.add(style.containerActive)}
          onBlur={()=>containerRef.current.classList.remove(style.containerActive)}
          onChange={(e)=>setSearchValue(e.target.value)}
        />
    </div>
  )
}

export default Searchbar