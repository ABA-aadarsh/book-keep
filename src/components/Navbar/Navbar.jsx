import React from 'react'
import style from "./Navbar.module.css"
import Searchbar from './Searchbar/Searchbar'
import AccountBtn from './AccountBtn/AccountBtn'

function Navbar() {
  return (
    <header className={style.navbar}> 
        <div className={style.centerContainer}>
            <div>
                <img src="" alt="logo" />
            </div>

            <Searchbar/>


            <AccountBtn/>
        </div>
    </header>
  )
}

export default Navbar