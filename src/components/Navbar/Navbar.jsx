import React from 'react'
import style from "./Navbar.module.css"
import Searchbar from './Searchbar/Searchbar'
import AccountBtn from './AccountBtn/AccountBtn'
import { GiWhiteBook } from "react-icons/gi";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className={style.navbar}> 
        <div className={style.centerContainer}>
            <div className={style.logoBox}>
              <Link
              to={"/"}
              className={style.links+" "+style.icon}
              >
                <GiWhiteBook/>
              </Link>

              <Link
                to={"/"}
                className={style.links}
              >
                <h1
                  className={style.logoText}
                >Book Keep</h1>
              </Link>
              
              {/* <GiWhiteBook
                className={style.links}
              />
              <h1>Book Keep</h1> */}
            </div>
            <div
              className={style.searchAndAccount}
            >
            <Searchbar/>
            <AccountBtn/>
            </div>
        </div>
    </header>
  )
}

export default Navbar