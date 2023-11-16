import React, { useState } from 'react'
import style from "./Searchbar.module.css"

function Searchbar() {
    const [searchValue,setSearchValue]=useState("")
  return (
    <div>
        <input type="text" 
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
        />
    </div>
  )
}

export default Searchbar